import React, { Component } from 'react';
import { Box, Flex, Text, Heading, Button, Progress, Stack, Image } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import * as web3Actions from 'redux/modules/web3';
import axios from 'axios';
import theme from 'theme.js';
import styled from '@emotion/styled';
import { FADE_IN } from 'style/animations';

const CheckoutItems = styled(Flex)`
    ${FADE_IN}
`;

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
    const { Web3Actions } = this.props;
    Web3Actions.fetchWeb3();
    Web3Actions.fetchEthereum();
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

  render() {
    const { user } = this.props;

    return (
      <CheckoutItems justify='center' mt='40px' px={{sm: '8px', md: '0px'}}>
        <Box color='white' maxW='900px' flex='1'>
          <Heading pt={2} as='h2' size='2xl' color={`${theme.colors.etGreen}`}>
            payment
          </Heading>

          <Text fontSize='sm' mb={4} color='grey'>
            Electric Tooth currently only accepts PayPal & Ethereum payments
          </Text>

          <Flex justify='center' py={4} px={4}>
            <Heading as='h3' fontSize={['lg', 'xl']} color={`${theme.colors.etGreen}`}>
              100% of this purchase goes to the artist
            </Heading>
          </Flex>

          <Stack>
            {user.cart.items?.length > 0 ? (
              user.cart.items.map(
                ({ id, artist_name, track_name, album_name, art_name, download_price, type, amount, price }) => (
                  <Flex borderWidth='1px' key={id} bg='white' borderRadius="20px" boxShadow='0 2px 4px 0 rgba(0,0,0,.25)'>
                    <Box>
                      <Image src={`/uploads/${art_name}`} width="100px" borderRadius="20px 0 0 20px" />
                    </Box>

                    <Box p={2}>
                      <Heading as='h6' fontSize={['sm', 'md', 'lg', 'xl']} color='gray.600'>
                        {type === 'coin' && `${amount} stream coins`}
                        {type === 'album' && album_name}
                        {type === 'track' && `${track_name} (MP3)`}
                      </Heading>
                      <Text fontSize={['xs', 'sm', 'md', 'lg']} mb={4} color='gray.500'>
                        {artist_name ? artist_name : `@ $0.01`}
                      </Text>
                    </Box>

                    <Box mx='auto' />

                    <Flex p={2} direction='column' justify='center' align='center'>
                      <Text px={2} color='#222'>
                        {type === 'coin' && `$${price}.00`}
                        {type === 'album' && `$${download_price}.00`}
                        {type === 'track' && `$${download_price}.00`}
                      </Text>
                    </Flex>
                  </Flex>
                ),
              )
            ) : (
              undefined
            )}
          </Stack>

          <Flex justify='flex-end' py={2} px={2} mt={4}>
            <Box px={2} color='black'>
              Subtotal ({`${user.cart.items.length}`} items):
            </Box>
            <Box color='black'>${`${user.cart.total}`}.00</Box>
          </Flex>

          <Flex justify='flex-end' pb={2} pt={0} px={2} color='black'>
            <Box color='black' px={2}>
              Total:
            </Box>
            <Box>
              <b>${`${user.cart.total}`}.00</b>
            </Box>
          </Flex>

          <Flex direction="column" alignItems="flex-end" pt={4}>
            <Box>
              <form id='paypalForm' method='post' action={`/api/v1/paypal/request`}>
                <input type='hidden' name='userId' value={user.userId} />
                <Button rounded='md' bg='#ffc439' color='black' px={4} h={8} my={2} type='submit' w='200px'>
                  Checkout with PayPal
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
                onClick={this.initConnect}
                disabled={this.props.error}
              >
                Connect to MetaMask
              </Button>
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
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
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
