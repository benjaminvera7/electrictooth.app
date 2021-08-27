import React from 'react';
import { Box, Flex, Image, Stack, Badge, IconButton, useToast, Text } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';

//import Helmet from 'react-helmet';
import theme from 'theme.js';

const CartAdd = () => (
  <Flex h='48px' alignItems='center' justifyContent='center'>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.90918H4.2V11.5092H14.8667L17 4.04251" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round" />
      <path d="M4.7333 17.9091C5.61696 17.9091 6.3333 17.1928 6.3333 16.3091C6.3333 15.4255 5.61696 14.7091 4.7333 14.7091C3.84965 14.7091 3.1333 15.4255 3.1333 16.3091C3.1333 17.1928 3.84965 17.9091 4.7333 17.9091Z" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round" />
      <path d="M14.3334 17.9091C15.2171 17.9091 15.9334 17.1928 15.9334 16.3091C15.9334 15.4255 15.2171 14.7091 14.3334 14.7091C13.4497 14.7091 12.7334 15.4255 12.7334 16.3091C12.7334 17.1928 13.4497 17.9091 14.3334 17.9091Z" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round" />
      <path d="M9.54539 7.72732H11.3636V5.00004H14.0908V3.18186H11.3636V0.45459H9.54539V3.18186H6.81812V5.00004H9.54539V7.72732Z" fill="#89DBFF" />
    </svg>
  </Flex>
);

const PlaylistAdd = () => (
  <Flex h='48px' alignItems='center' justifyContent='center'>
    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8713 4.95783H0.677734V6.99008H12.8713V4.95783ZM12.8713 0.893311H0.677734V2.92557H12.8713V0.893311ZM16.9358 9.02234V4.95783H14.9035V9.02234H10.839V11.0546H14.9035V15.1191H16.9358V11.0546H21.0003V9.02234H16.9358ZM0.677734 11.0546H8.80677V9.02234H0.677734V11.0546Z" fill="#89DBFF" />
    </svg>
  </Flex>
);

const Album = ({ pending, match, albums, artists, UserActions, history, auth }) => {
  const toast = useToast()

  let albumName = match.params.name.replaceAll('-', ' ');
  let currentAlbum = albums.filter((a) => a.album_name === albumName)[0];
  let currentArtist = artists.filter((a) => a._id === currentAlbum.artist)[0];
  //let artistAlbums = albums.filter((a) => a.artist_name === currentArtist.artist_name);

  const addToCart = (id, type) => {
    if (auth) {
      UserActions.addToCart(id, type, null, auth);
      toast({
        title: "Added to cart",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      history.push('/signup');
    }
  };

  const addToPlaylist = (id, type) => {
    if (auth) {
      UserActions.addToPlaylist(id, type, auth);
      toast({
        title: "Added to playlist",
        duration: 2000,
        status: 'success',
        isClosable: true,
      })
    } else {
      history.push('/signup');
    }
  };

  if (pending || pending === undefined) {
    return <div>loading</div>;
  }

  return (
    <Flex justify='center' mt='64px' backgroundColor={`${theme.colors.etBlack}`}>
      <Box color='white' maxW='900px' flex='1' px={{ xs: 2, lg: 2 }}>

        <Flex display={{ md: "flex" }}>

          <Flex justifyContent='center' mb='24px'>
            <Image
              src={`/uploads/${currentAlbum.art_name}`}
              maxWidth='300px'
              maxHeight='300px'
              borderRadius="16px"
              border="2px solid #89DBFF"
              boxShadow='8px 8px 0 #89DBFF'
              fallbackSrc="/sand.gif"
            />
          </Flex>

          <Flex flexDirection='column' px="24px" width='100%'>

            <Flex>
              <Box flex='2'>
                <Badge mr='8px' px={2} bg={`${theme.colors.etViolet}`} color='white' height="18px" style={{ fontFamily: 'Spotify-Light' }}>
                  {currentAlbum.type}
                </Badge>
                {currentAlbum.tags.map((tag, i) => (
                  <Badge mr='8px' px={2} bg={`${theme.colors.etBlue}`} key={i} height="18px" style={{ fontFamily: 'Spotify-Light' }}>
                    {tag}
                  </Badge>
                ))}
              </Box>
              <Box style={{ cursor: 'default' }}>
                ${currentAlbum.download_price}.00
              </Box>
            </Flex>

            <Box fontWeight='semibold' fontSize="18px" lineHeight='tight' isTruncated color='white' pb="8px" style={{ fontFamily: 'Spotify-Bold' }}>
              {currentAlbum.album_name}
            </Box>

            <Flex color='white' fontSize="18px" style={{ fontFamily: 'Spotify-Light' }} pb="8px" alignItems='center'>
              <Link to={`/artist/${currentAlbum.artist_name.replaceAll(' ', '-')}`}>
                <Image src={`/uploads/${currentArtist.artist_img}`} width='32px' height='32px' borderRadius="50%" boxShadow='1px 1px 0 #89DBFF' objectFit='cover' fallbackSrc="https://via.placeholder.com/32" />
              </Link>
              <Box pl='16px' style={{ cursor: 'default' }}>
                {currentAlbum.artist_name}
              </Box>
            </Flex>

            <Box style={{ cursor: 'default' }}>
              {currentAlbum.type && 'LP - 2021'}
            </Box>

          </Flex>
        </Flex>

        <Stack spacing={3} py="32px" px="24px">
          {currentAlbum.tracks.map((track, i) => (
            <Flex alignItems='center' justifyContent='center' height='48px'>
              <Flex flex='2'><Text fontSize={{ base: '12px', sm: "14px", md: "16px", lg: "16px" }} style={{ cursor: 'default' }} fontFamily='Spotify-Bold'>{track.track_name}</Text></Flex>
              <Flex fontFamily='Spotify-Light' pr='16px' style={{ cursor: 'default' }}>
                ${track.download_price}.00
              </Flex>
              <Flex w='48px' justifyContent='center' alignItems='center'>
                <IconButton
                  variant='unstyled'
                  aria-label='Download album'
                  icon={<CartAdd />}
                  onClick={() => addToCart(track._id, track.type)}
                />
              </Flex>
              <Flex w='48px' justifyContent='center' alignItems='center'>
                <IconButton
                  variant='unstyled'
                  variantColor='teal'
                  aria-label='Add to playlist'
                  icon={<PlaylistAdd />}
                  onClick={() => addToPlaylist(track._id, track.type)}
                />
              </Flex>
            </Flex>
          ))}
        </Stack>
      </Box>
    </Flex>
  );

}

export default connect(
  (state) => ({
    albums: state.music.albums,
    artists: state.music.artists,
    albumCollection: state.user.albumCollection,
    playlist: state.user.playlist,
    auth: state.user.authenticated,
    updatedAt: state.music.updatedAt,
    updatedUserAt: state.user.updatedAt,
    pending: state.pender.pending['music/GET_ALBUMS'],
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Album);