import React from 'react';
import { Box, Flex, Heading, Image, Text, Stack, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
// import { Remove } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import theme from 'theme.js';
import { Remove } from 'components/Icons';


import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const CartItem = styled(Flex)`
  ${FADE_IN}
`;

// const getAmount = (product_id) => parseInt(product_id.substring(4, 7), 10);

const Cart = ({ UserActions, auth, cart }) => {
  return (
    <CartItem justify='center' mt='40px'>
      <Box color='white' maxW='768px' flex='1' px={{ xs: 2, lg: 2 }}>
        <Heading pt={2} as='h2' size='2xl' color='#05aea5'>
          cart
        </Heading>

        <Text fontSize='sm' mb={4} color='grey'>
          Review your order
        </Text>

        <Stack>
          {cart.items?.length > 0 ? (
            cart.items.map(
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

                  <Flex p={2}>
                    <Button onClick={() => UserActions.removeFromCart(id, type, auth)} color='black' variant='link'>
                      <Remove />
                    </Button>
                  </Flex>
                </Flex>
              ),
            )
          ) : (
            <Flex justify='center' color='grey'>
              your cart is empty
            </Flex>
          )}

          {cart.items?.length > 0 ? (
            <>
              <Flex justify='flex-end' pt={4}>
                <Box px={2} color='black'>
                  Subtotal ({cart.items !== undefined ? cart.items.length : 0}):
                </Box>
                <Box color='black'>
                  <b>${cart.items !== undefined ? cart.total : 0}.00</b>
                </Box>
              </Flex>

              <Flex justify='flex-end' py={2}>
                <Link to='/checkout'>
                  <Box as='button' rounded='md' bg={`${theme.colors.etGreen}`} color='white' px={4} h={8}>
                    checkout
                  </Box>
                </Link>
              </Flex>
            </>
          ) : undefined}
        </Stack>
      </Box>
    </CartItem>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    cart: state.user.cart,
    updatedAt: state.user.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Cart);
