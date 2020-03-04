import React, { Component } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
} from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import * as web3Actions from 'redux/modules/web3';
import axios from 'axios';

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
      let { data } = await axios.get('https://api.infura.io/v1/ticker/ethusd');

      this.setState({
        rate: data.bid,
        totalEth: this.props.user.cart.total / data.bid,
      });
    } catch (error) {
      return error;
    }
  };

  balance = async () => {
    const { service, address } = this.props;
    const { rate } = this.state;

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
      url: `/eth/request`,
      method: 'POST',
      headers: { Authorization: token },
    });
  };

  returnPayment = (token, hash, orderId) => {
    return axios({
      url: `/eth/return/${hash}/${orderId}`,
      method: 'GET',
      headers: { Authorization: token },
    });
  };

  sendTransaction = async () => {
    const { service, address, user, history } = this.props;

    this.setState({
      pending: true,
      part: 100 / 5,
      status: 'initializing transaction',
    });

    let { data } = await this.requestPayment(user.authenticated);

    this.setState({
      part: (this.state.part += 100 / 5),
    });

    let orderId = data.order._id;

    if (!data.order.error) {
      try {
        let gasPrice = await service.eth.getGasPrice();

        this.setState({
          part: (this.state.part += 100 / 5),
        });

        const TRANSACTION = await service.eth.sendTransaction({
          from: address, //metamask
          to: '0x866ff4209d37813cc2c46361775b960d81e6b724', //coinbase
          value: service.utils.toWei(this.state.totalEth.toString(), 'ether'),
          gasLimit: 21000,
          gasPrice: gasPrice,
        });

        this.setState({
          part: (this.state.part += 100 / 5),
        });

        if (TRANSACTION.status === true) {
          let { data } = await this.returnPayment(
            user.authenticated,
            TRANSACTION.transactionHash,
            orderId,
          );

          this.setState({
            part: (this.state.part += 100 / 5),
          });

          history.push(`/download/${data.order._id}`);
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
      <Flex justify='center'>
        <Box color='white' maxW='1100px' flex='1'>
          <Heading px={4} pt={2} as='h2' size='2xl'>
            payment
          </Heading>

          <Text px={4} fontSize='sm' mb={4} color='grey'>
            Electric Tooth currently only accepts PayPal payments
          </Text>

          <Flex justify='center' py={2} px={4}>
            <Heading as='h3' fontSize={['lg', 'xl']} color='#6eacdd'>
              100% of this purchase goes to the artist(s)
            </Heading>
          </Flex>

          <Flex justify='flex-end' py={2} px={4}>
            <Box px={2}>Subtotal ({`${user.cart.items.length}`} items):</Box>
            <Box>${`${user.cart.total}`}.00</Box>
          </Flex>

          <Flex justify='flex-end' pb={2} pt={0} px={4}>
            <Box px={2}>total:</Box>
            <Box>${`${user.cart.total}`}.00</Box>
          </Flex>

          <Heading px={4} mb={2}>
            PayPal
          </Heading>

          <form
            id='paypalForm'
            method='post'
            action={`${process.env.REACT_APP_API_URL}/paypal/request`}
          >
            <input type='hidden' name='userId' value={user.userId} />
            <Button
              rounded='md'
              bg='#ffc439'
              color='black'
              px={4}
              h={8}
              my={2}
              mx={4}
              type='submit'
              w='300px'
            >
              Checkout with PayPal
            </Button>
          </form>

          <Heading px={4} mb={2} py={4} pb={0}>
            Ethereum
          </Heading>

          {this.state.active ? (
            <Button
              rounded='md'
              backgroundColor='rgb(198, 246, 213)'
              color='black'
              px={4}
              h={8}
              my={2}
              mx={4}
              type='submit'
              w='300px'
              onClick={this.sendTransaction}
            >
              Checkout
            </Button>
          ) : (
            <Button
              rounded='md'
              bg='#E0897F'
              color='black'
              px={4}
              h={8}
              my={2}
              mx={4}
              type='submit'
              w='300px'
              onClick={this.initConnect}
            >
              Connect
            </Button>
          )}

          <Box p={4}>
            <Stat>
              <StatLabel>{`${this.props.address}`}</StatLabel>
              <StatNumber>{`${this.state.balance}`} ETH</StatNumber>
              <StatHelpText>{`$ ${this.state.usd}`} USD</StatHelpText>
            </Stat>
          </Box>

          <Box px={4}>
            {this.state.pending && (
              <Progress hasStripe isAnimated value={this.state.part} />
            )}
          </Box>
        </Box>
      </Flex>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    web3: state.web3.web3,
    address: state.web3.address,
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
