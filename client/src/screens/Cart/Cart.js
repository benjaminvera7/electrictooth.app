import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Stack,
  Button,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Remove } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import theme from 'theme.js';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const CartItem = styled(Flex)`
  ${FADE_IN}
`;

const Cart = ({ UserActions, auth, cart }) => {
  return (
    <CartItem justify='center' mt='80px'>
      <Box color='white' maxW='1440px' flex='1' px={{ xs: 2, lg: 0 }}>
        <Heading pt={2} as='h2' size='2xl' color='#05aea5'>
          cart
        </Heading>

        <Text fontSize='sm' mb={4} color='grey'>
          Review your order
        </Text>

        <Stack>
          {cart.items.length > 0 ? (
            cart.items.map(
              ({
                id,
                artist_name,
                song_name,
                album_name,
                art_url,
                download_price,
                price,
                amount,
                product_id,
              }) => (
                <Flex borderWidth='1px' key={id} bg='white'>
                  <Box>
                    <Image
                      src={`/uploads/${art_url}`}
                      maxWidth={['75px', '75px', '165px', '165px']}
                    />
                  </Box>

                  <Box p={2}>
                    <Heading
                      as='h6'
                      fontSize={['sm', 'md', 'lg', 'xl']}
                      color='#000'
                      color='gray.600'
                    >
                      {amount && `${amount} coins`}
                      {album_name && album_name}
                      {song_name && `${song_name} (MP3)`}
                    </Heading>
                    <Text
                      fontSize={['xs', 'sm', 'md', 'lg']}
                      mb={4}
                      color='gray.500'
                    >
                      {artist_name ? artist_name : `@ $0.01`}
                    </Text>
                  </Box>

                  <Box mx='auto' />

                  <Flex
                    p={2}
                    direction='column'
                    justify='center'
                    align='center'
                  >
                    <Text px={2} color='#222'>
                      ${download_price ? download_price : price}.00
                    </Text>
                  </Flex>

                  <Flex p={2}>
                    <Button
                      onClick={() =>
                        UserActions.removeFromCart(product_id, auth)
                      }
                      color='black'
                      variant='link'
                    >
                      remove
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

          {cart.items.length > 0 ? (
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
                  <Box
                    as='button'
                    rounded='md'
                    bg={`${theme.colors.etGreen}`}
                    color='white'
                    px={4}
                    h={8}
                  >
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
    updatedAt: state.album.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Cart);
