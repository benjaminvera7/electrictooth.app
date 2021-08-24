import React from 'react';
import { Box, Flex, Heading, Image, Text, Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import theme from 'theme.js';
import { Remove } from 'components/Icons';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';

const CartItem = styled(Flex)`
  background: linear-gradient(90deg, #1D1D1D 0%, #342D54 100%);
`

const Cart = ({ UserActions, auth, cart }) => {

  const renderLineItems = (item) => {
    switch (item.type) {
      case 'album':
        return renderAlbumItem(item)
      case 'track':
        return renderTrackItem(item)
      case 'coin':
        return renderCoinItem(item)
      default:
        return null
    }
  }

  const renderAlbumItem = (album) => {
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
          mx={4}
          minWidth='320px'
        >
          <Box width="72px" height="72px" overflow='hidden' position='relative' ml='-16px' borderRadius='16px 0 0 16px'>
            <Link to={`/music/${album.album_name.replaceAll('-', ' ')}`}>
              <Image src={`/uploads/${album.art_name}`} h='100%' w='100%' objectFit='cover' />
            </Link>
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

        <Flex justifyContent='center'>
          <Button onClick={() => UserActions.removeFromCart(album.id, album.type, album.size, auth)} color='black' variant='link'>
            <Remove />
          </Button>
        </Flex>
      </Flex>
    )
  }

  const renderTrackItem = (track) => {
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
          mx={4}
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

        <Flex justifyContent='center'>
          <Button onClick={() => UserActions.removeFromCart(track.id, track.type, track.size, auth)} color='black' variant='link'>
            <Remove />
          </Button>
        </Flex>
      </Flex>
    )
  }

  const renderCoinItem = (coin) => {
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

        <Flex justifyContent='center'>
          <Button onClick={() => UserActions.removeFromCart(coin.id, coin.type, coin.size, auth)} color='black' variant='link'>
            <Remove />
          </Button>
        </Flex>
      </Flex>
    )
  }

  return (
    <Box backgroundColor={`${theme.colors.etBlack}`} px={4}>
      <Helmet>
        <title>Electric Tooth - cart</title>
        <meta name='description' content='amazing' />
      </Helmet>

      <Flex justify='center' mt='64px'>
        <Box color='white' maxW='900px' flex='1' px={{ xs: 2, lg: 2 }}>
          <Heading px={4} pt={2} as='h4' size='md' color='white' fontFamily='Spotify-Bold'>
            Cart
          </Heading>

          <Text fontSize='md' mb={4} color='white' px={4} fontFamily='Spotify-Light'>
            {cart.items?.length ? `(${cart.items.length} items)` : `(0 items)`}
          </Text>

          <Stack>
            {cart.items?.length > 0
              ? cart.items.map((item) => renderLineItems(item))
              :
              <Flex justify='center' color='grey'>
                Your cart is empty
              </Flex>
            }

            {cart.items?.length > 0 ? (
              <Box px={2}>
                <Flex justify='flex-end' pt={4}>
                  <Box px={2} color='white' fontFamily='Spotify-Light'>
                    Subtotal ({cart.items !== undefined ? cart.items.length : 0}):
                  </Box>
                  <Box color='white' fontFamily='Spotify-Bold'>
                    <b>${cart.items !== undefined ? cart.total : 0}.00</b>
                  </Box>
                </Flex>

                <Flex justify='flex-end' py={2}>
                  <Link to='/checkout'>
                    <Box as='button' rounded='md' bg={`${theme.colors.etBlue}`} color='black' px={4} h='41px'>
                      Proceed to Checkout
                    </Box>
                  </Link>
                </Flex>
              </Box>
            ) : undefined}
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
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