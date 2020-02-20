import React, { useState } from 'react';
import { Box, Flex, Text, Heading, Button } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';

const Checkout = ({ user }) => {
  const form = document.getElementById('paypalForm');
  const [loading, setPending] = useState(false);

  if (form) {
    form.addEventListener('submit', () => {
      setPending(true);
    });
  }

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
          <Heading as='h3' size='xl' color='#6eacdd'>
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
            isLoading={loading}
          >
            PayPal
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default connect(
  (state) => ({
    user: state.user,
    updatedAt: state.album.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Checkout);
