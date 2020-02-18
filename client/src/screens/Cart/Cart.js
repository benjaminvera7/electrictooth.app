import React from 'react';
import { Box, Flex, Heading, Image, Text, Stack } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Remove } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const CartItem = styled(Flex)`
  ${FADE_IN}
`;

const Cart = ({ UserActions, auth, cart }) => {
  return (
    <CartItem justify='center'>
      <Box color='white' maxW='1100px' flex='1'>
        <Heading px={4} pt={2} as='h2' size='2xl'>
          cart
        </Heading>

        <Text px={4} fontSize='sm' mb={4} color='grey'>
          Review your order
        </Text>

        <Stack mx={2}>
          {cart.items.length > 0 ? (
            cart.items.map(
              ({
                id,
                artist_name,
                album_name,
                art_url,
                download_price,
                price,
                amount,
                product_id,
              }) => (
                <Flex py={2} borderWidth='1px' rounded='lg' key={id}>
                  <Box>
                    <Image src={`/uploads/${art_url}`} maxWidth='96px' px={2} />
                  </Box>
                  <Box>
                    <Heading as='h6' size='md'>
                      {album_name ? album_name : `${amount} coins`}
                    </Heading>
                    <Text fontSize='sm' mb={4} color='grey'>
                      {artist_name ? album_name : `@ $0.01`}
                    </Text>
                  </Box>
                  <Box mx='auto' />
                  <Flex px={2}>
                    <Box px={2}>
                      $ {download_price ? download_price : price}.00
                    </Box>
                    <Box
                      onClick={() =>
                        UserActions.removeFromCart(product_id, auth)
                      }
                    >
                      <Remove />
                    </Box>
                  </Flex>
                </Flex>
              ),
            )
          ) : (
            <Flex justify='center' color='grey'>
              your cart is empty
            </Flex>
          )}

          {cart.items.length > 0 ? (
            <>
              <Flex justify='flex-end' pt={4}>
                <Box px={2}>
                  Subtotal ({cart.items !== undefined ? cart.items.length : 0}):
                </Box>
                <Box>$ {cart.items !== undefined ? cart.total : 0}.00</Box>
              </Flex>

              <Flex justify='flex-end' py={2}>
                <Link to='/checkout'>
                  <Box
                    as='button'
                    rounded='md'
                    bg='#4794d2'
                    color='white'
                    px={4}
                    h={8}
                  >
                    checkout
                  </Box>
                </Link>
              </Flex>
            </>
          ) : (
            undefined
          )}
        </Stack>
      </Box>
    </CartItem>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    cart: state.user.cart,
    updatedAt: state.album.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Cart);
