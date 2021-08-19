import React, { Component } from 'react';
import { Box, Flex, Text, Heading, Button, Progress, Stack, Image } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import * as web3Actions from 'redux/modules/web3';
import axios from 'axios';
import theme from 'theme.js';
import styled from '@emotion/styled';
import { FADE_IN } from 'style/animations';
import Helmet from 'react-helmet';

const CheckoutItems = styled(Flex)`
    ${FADE_IN}
`;

const CartItem = styled(Flex)`
  background: linear-gradient(90deg, #1D1D1D 0%, #342D54 100%);
`

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      balance: null,
      rate: null,
      usd: null,
      tipAmount: null,
      active: false,
      totalEth: null,
      status: 'disconnected',
    };
  }

  componentWillMount() {
    //const { Web3Actions } = this.props;
    //Web3Actions.fetchWeb3();
    //Web3Actions.fetchEthereum();
  }

  initConnect = async () => {
    const { Web3Actions, web3, privacyMode } = this.props;

    if (privacyMode) {
      try {
        await web3.enable();
        await Web3Actions.initializeEthereum(web3);
      } catch (error) {
        console.log('Electric Tooth was denied web3 permissions!');
      }
    } else {
      await Web3Actions.initializeEthereum(window.web3);
    }

    await this.getEthRate();
    await this.balance();
  };

  getEthRate = async () => {
    try {

      const { data } = await axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=PIBNFTNWYFQN2H387T61KZCRQGVQJB9RAP');

      this.setState({
        rate: data.result.ethusd,
        totalEth: this.props.user.cart.total / data.result.ethusd,
      });
    } catch (error) {
      return error;
    }
  };

  balance = async () => {
    const { service } = this.props;
    const { rate } = this.state;

    const [address] = await service.eth.getAccounts();

    service.eth.getBalance(address).then(async (wei) => {
      let balance = await service.utils.fromWei(wei.toString(), 'ether');

      let balance_num = Number.parseFloat(balance).toFixed(4);
      let usd = Number.parseFloat(balance_num * rate).toFixed(2);

      this.setState({
        balance: balance_num,
        usd: usd,
        active: true,
      });
    });
  };

  requestPayment = (token) => {
    return axios({
      url: `/api/v1/eth/request`,
      method: 'POST',
      headers: { Authorization: token },
    });
  };

  returnPayment = (token, hash, orderId) => {
    return axios({
      url: `/api/v1/eth/return/${hash}/${orderId}`,
      method: 'GET',
      headers: { Authorization: token },
    });
  };

  sendTransaction = async () => {
    const { service, user, history } = this.props;

    const [address] = await service.eth.getAccounts();

    this.setState({
      pending: true,
      part: 100 / 5,
      status: 'initializing transaction',
    });

    let { data: order } = await this.requestPayment(user.authenticated);

    this.setState({
      part: (this.state.part += 100 / 5),
    });

    let orderId = order._id;

    if (!order.error) {
      try {
        let gasPrice = await service.eth.getGasPrice();

        this.setState({
          part: (this.state.part += 100 / 5),
        });

        const totalEth = this.state.totalEth.toFixed(8)

        const TRANSACTION = await service.eth.sendTransaction({
          from: address, //metamask
          to: '0x866ff4209d37813cc2c46361775b960d81e6b724', //coinbase
          value: service.utils.toWei(totalEth.toString(), 'ether'),
          gasLimit: 21000,
          gasPrice: gasPrice,
        });

        this.setState({
          part: (this.state.part += 100 / 5),
        });

        if (TRANSACTION.status === true) {
          await this.returnPayment(user.authenticated, TRANSACTION.transactionHash, orderId);

          this.setState({
            part: (this.state.part += 100 / 5),
          });

          history.push(`/download/${order._id}`);
        } else {
          //report to ET server of failure, update order, update page with failure noticeß
          this.setState({
            part: 0,
          });

          throw new Error('Transaction failed');
        }
      } catch (error) {
        this.setState({
          pending: false,
          status: 'ERROR',
        });
        console.log(error);
      }
    }
  };

  renderLineItems = (item) => {
    switch (item.type) {
      case 'album':
        return this.renderAlbumItem(item)
      case 'track':
        return this.renderTrackItem(item)
      case 'coin':
        return this.renderCoinItem(item)
      default:
        return null
    }
  }

  renderAlbumItem = (album) => {
    return (
      <Flex>
        <CartItem
          flex='2'
          alignItems='center'
          px={4}
          boxShadow='8px 8px 0 #89DBFF'
          border="2px solid #89DBFF"
          borderRadius="18px"
          mb='18px'
          justifyContent='space-between'
          alignItems='center'
          mx={4}
          minWidth='320px'
        >
          <Box width="72px" height="72px" overflow='hidden' position='relative' ml='-16px' borderRadius='16px 0 0 16px'>
            <Image src={`/uploads/${album.art_name}`} h='100%' w='100%' objectFit='cover' />
          </Box>
          <Flex direction='column' paddingLeft={4} flex='2'>
            <Text fontSize='sm' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
              {album.album_name}
            </Text>
            <Text fontSize='sm' style={{ fontFamily: 'Spotify-Light' }} color='white'>
              {album.artist_name}
            </Text>
          </Flex>
          <Flex p={2} direction='column' justify='center' align='center'>
            <Text px={2} color='white'>
              {`$${album.download_price}.00`}
            </Text>
          </Flex>
        </CartItem>
      </Flex>
    )
  }

  renderTrackItem = (track) => {
    return (
      <Flex>
        <CartItem
          flex='2'
          alignItems='center'
          boxShadow='8px 8px 0 #89DBFF'
          border="2px solid #89DBFF"
          borderRadius="18px"
          mb='18px'
          px={4}
          mx={4}
          justifyContent='space-between'
          alignItems='center'
          minWidth='320px'
        >
          <Box width="72px" height="72px" overflow='hidden' position='relative' ml='-16px' borderRadius='16px 0 0 16px'>
            <Image src={`/uploads/${track.art_name}`} h='100%' w='100%' objectFit='cover' />
          </Box>
          <Flex direction='column' paddingLeft={4} flex='2'>
            <Text fontSize='sm' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
              {track.track_name} (MP3)
            </Text>
            <Text fontSize='sm' style={{ fontFamily: 'Spotify-Light' }} color='white'>
              {track.artist_name}
            </Text>
          </Flex>
          <Flex p={2} direction='column' justify='center' align='center'>
            <Text px={2} color='white'>
              {`$${track.download_price}.00`}
            </Text>
          </Flex>
        </CartItem>
      </Flex>
    )
  }

  renderCoinItem = (coin) => {
    return (
      <Flex>
        <CartItem
          flex='2'
          alignItems='center'
          px={4}
          boxShadow='8px 8px 0 #89DBFF'
          border="2px solid #89DBFF"
          borderRadius="18px"
          mb='18px'
          justifyContent='space-between'
          alignItems='center'
          mx={4}
          minWidth='320px'
          height="72px"
        >
          <Flex overflow='hidden' position='relative' justifyContent='center' alignItems='center' pr='16px'>
            <Image src={`${coin.price}coin.png`} w='40px' h='48px' />
          </Flex>
          <Flex direction='column' paddingLeft={4} flex='2'>
            <Text fontSize='sm' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
              {coin.amount} Stream Coins
            </Text>
            <Text fontSize='sm' style={{ fontFamily: 'Spotify-Light' }} color='white'>
              @ $0.01
            </Text>
          </Flex>
          <Flex p={2} direction='column' justify='center' align='center'>
            <Text px={2} color='white'>
              {`$${coin.price}.00`}
            </Text>
          </Flex>
        </CartItem>
      </Flex>
    )
  }

  render() {
    const { user } = this.props;

    return (
      <Box backgroundColor={`${theme.colors.etBlack}`} px={4}>
        <Helmet>
          <title>Electric Tooth - checkout</title>
          <meta name='description' content='amazing' />
        </Helmet>

        <CheckoutItems justify='center' mt='64px'>
          <Box color='white' maxW='900px' flex='1'>
            <Heading pt={2} as='h4' size='md' color='white' fontFamily='Spotify-Bold' px='10px'>
              Checkout
            </Heading>

            <Text fontSize='md' mb={4} color='white' fontFamily='Spotify-Light' px='10px'>
              Review your order
            </Text>

            {/* <Text fontSize='md' mb={4} color='white' fontFamily='Spotify-Light'>
              Electric Tooth currently only accepts PayPal & Ethereum payments
            </Text> */}

            <Flex justify='center' py={4}>
              <Heading as='h3' fontSize={['lg', 'xl']} color={`${theme.colors.etViolet}`}>
                100% of this purchase goes to the artist
              </Heading>
            </Flex>

            <Stack>
              {user.cart.items?.length > 0 ? (
                user.cart.items.map((item) => this.renderLineItems(item))
              ) : (
                undefined
              )}
            </Stack>

            <Flex justify='flex-end' py={2} px={2} mt={4}>
              <Box px={2} color='white' fontFamily='Spotify-Light'>
                Subtotal ({`${user.cart.items.length}`} items):
              </Box>
              <Box color='white'>${`${user.cart.total}`}.00</Box>
            </Flex>

            <Flex justify='flex-end' pb={2} pt={0} px={2}>
              <Box color='white' px={2} fontFamily='Spotify-Light'>
                Total:
              </Box>
              <Box color='white' fontFamily='Spotify-Bold'>
                <b>${`${user.cart.total}`}.00</b>
              </Box>
            </Flex>

            <Flex direction="column" alignItems="flex-end" pt={2}>
              <Box>
                <form id='paypalForm' method='post' action={`/api/v1/paypal/request`}>
                  {/* <input type='hidden' name='userId' value={user.userId} /> */}
                  <input type="hidden" name="auth" value={this.props.auth} />
                  <Button rounded='md' bg='#fec339' color='black' px={4} h={8} my={2} type='submit' w='200px' style={{
                    background: '#fec339',
                  }}>
                    <Image src='/paypal.png' />
                  </Button>
                </form>
              </Box>


              {this.state.active ? (
                <Button
                  rounded='md'
                  style={{
                    background: '#f08d1d',
                  }}
                  color='black'
                  px={4}
                  h={8}
                  my={2}
                  type='submit'
                  w='200px'
                  onClick={this.sendTransaction}
                >
                  Checkout with MetaMask
                </Button>
              ) : (
                undefined
                // <Button
                //   rounded='md'
                //   style={{
                //     background: '#f08d1d',
                //   }}
                //   color='black'
                //   px={4}
                //   h={8}
                //   my={2}
                //   type='submit'
                //   w='200px'
                //   onClick={this.initConnect}
                //   disabled={this.props.error}
                // >
                //   Connect to MetaMask
                // </Button>
              )}
            </Flex>


            <Box px={4} mt={4}>
              {this.state.pending && (
                <>
                  <Progress hasStripe isAnimated value={this.state.part} />
                  <Text color={`${theme.colors.etGreen}`}>
                    Please wait as your transaction is being processed. You will be redirected after its been confirmed
                  </Text>
                </>
              )}
            </Box>
          </Box>
        </CheckoutItems>
      </Box>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    auth: state.user.authenticated,
    web3: state.web3.web3,
    service: state.web3.service,
    privacyMode: state.web3.privacyMode,
    error: state.web3.error,
    updatedAt: state.web3.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    Web3Actions: bindActionCreators(web3Actions, dispatch),
  }),
)(Checkout);
