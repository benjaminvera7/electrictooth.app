import React, { Component, Fragment } from 'react';
import { Box, Flex, Text, Image, Heading, Stack, Badge, IconButton, Icon } from '@chakra-ui/react';
//import { PlaylistAdd, CartAdd } from 'components/Icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import toast from 'util/toast';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import theme from 'theme.js';

const CartAdd = () => (
  <Icon mt="-4px">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.90918H4.2V11.5092H14.8667L17 4.04251" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round" />
      <path d="M4.7333 17.9091C5.61696 17.9091 6.3333 17.1928 6.3333 16.3091C6.3333 15.4255 5.61696 14.7091 4.7333 14.7091C3.84965 14.7091 3.1333 15.4255 3.1333 16.3091C3.1333 17.1928 3.84965 17.9091 4.7333 17.9091Z" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round" />
      <path d="M14.3334 17.9091C15.2171 17.9091 15.9334 17.1928 15.9334 16.3091C15.9334 15.4255 15.2171 14.7091 14.3334 14.7091C13.4497 14.7091 12.7334 15.4255 12.7334 16.3091C12.7334 17.1928 13.4497 17.9091 14.3334 17.9091Z" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round" />
      <path d="M9.54539 7.72732H11.3636V5.00004H14.0908V3.18186H11.3636V0.45459H9.54539V3.18186H6.81812V5.00004H9.54539V7.72732Z" fill="#89DBFF" />
    </svg>
  </Icon>
);
const PlaylistAdd = () => (
  <Icon>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.871 4.95783H0.67749V6.99008H12.871V4.95783ZM12.871 0.893311H0.67749V2.92557H12.871V0.893311ZM16.9356 9.02234V4.95783H14.9033V9.02234H10.8388V11.0546H14.9033V15.1191H16.9356V11.0546H21.0001V9.02234H16.9356ZM0.67749 11.0546H8.80652V9.02234H0.67749V11.0546Z" fill="#89DBFF" />
    </svg>
  </Icon>
);


class Album extends Component {
  addToCart = (id, type) => {
    if (this.props.auth) {
      this.props.UserActions.addToCart(id, type);
      toast(`Added to your Cart`);
    } else {
      this.props.history.push('/signup');
    }
  };

  addToPlaylist = (id, type) => {
    if (this.props.auth) {
      this.props.UserActions.addToPlaylist(id, type);
      toast(`Saved to your Playlist`);
    } else {
      this.props.history.push('/signup');
    }
  };

  render() {
    let { pending, match, albums, artists } = this.props;

    let albumName = match.params.name.replaceAll('-', ' ');
    let currentAlbum = albums.filter((a) => a.album_name === albumName)[0];
    let currentArtist = artists.filter((a) => a._id === currentAlbum.artist)[0];
    let artistAlbums = albums.filter((a) => a.artist_name === currentArtist.artist_name);

    if (pending || pending === undefined) {
      return <div>loading</div>;
    }

    return (
      <Box mt="64px" color='white' backgroundColor={`${theme.colors.etBlack}`}>

        <Flex justifyContent='center' mb='24px'>
          <Image
            src={`/uploads/${currentAlbum.art_name}`}
            maxWidth='264px'
            maxHeight='264px'
            borderRadius="16px"
            border="2px solid #89DBFF"
            boxShadow='8px 8px 0 #89DBFF'
          />
        </Flex>

        <Flex flexDirection='column' px="24px">

          <Flex justifyContent='space-between' pb="8px">
            <Box>
              {currentAlbum.tags.map((tag, i) => (
                <Badge mr='8px' px={2} bg={`${theme.colors.etBlue}`} key={i} height="18px" style={{ fontFamily: 'Spotify-Light' }}>
                  {tag}
                </Badge>
              ))}
            </Box>

            <Box>
              ${currentAlbum.download_price}.00
            </Box>
          </Flex>

          <Box fontWeight='semibold' fontSize="18px" lineHeight='tight' isTruncated color='white' pb="8px" style={{ fontFamily: 'Spotify-Bold' }}>
            {currentAlbum.album_name}
          </Box>

          <Flex color='white' fontSize="18px" style={{ fontFamily: 'Spotify-Light' }} pb="8px" alignItems='center'>
            <Link to={`/artist/${currentAlbum.artist_name}`}>
              <Image src={`/uploads/${currentArtist.artist_img}`} width='32px' height='32px' borderRadius="50%" boxShadow='1px 1px 0 #89DBFF' objectFit='cover' />
            </Link>
            <Box pl='16px'>
              {currentAlbum.artist_name}
            </Box>
          </Flex>
          <Box>
            {currentAlbum.type && 'LP - 2021'}
          </Box>
        </Flex>

        <Stack spacing={6} pt="32px" px="24px">
          {currentAlbum.tracks.map((track, i) => (
            <Flex alignItems='center' justifyContent='center'>
              <Box flex='1' fontFamily='Spotify-Bold'>{track.track_name}</Box>
              <Flex flex='1' fontFamily='Spotify-Bold' justifyContent='flex-end' alignItems='center'>
                <Box fontFamily='Spotify-Light' pr='16px'>${track.download_price}.00</Box>
                <Box mt="4px">
                  <IconButton
                    variant='unstyled'
                    aria-label='Download album'
                    icon={<CartAdd />}
                    onClick={() => this.addToCart(track._id, track.type)}
                  />
                  <IconButton
                    variant='unstyled'
                    variantColor='teal'
                    aria-label='Add to playlist'
                    icon={<PlaylistAdd />}
                    onClick={() => this.addToPlaylist(track._id, track.type)}
                  />
                </Box>
              </Flex>
            </Flex>
          ))}
        </Stack>
      </Box >
    );
  }
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

/*
              <Box flexBasis='50%' fontFamily='Spotify-Bold'>{track.track_name}</Box>
              <Box>${track.download_price}.00</Box>
              <Box>
                <IconButton
                  flex='1'
                  variant='ghost'
                  variantColor='teal'
                  aria-label='Download album'
                  fontSize='20px'
                  rounded='0px'
                  icon={<CartAdd color={`${theme.colors.etBlue}`} />}
                  onClick={() => this.addToCart(track._id, track.type)}
                />
              </Box>
              <Box>
                <IconButton
                  flex='1'
                  variant='ghost'
                  variantColor='teal'
                  aria-label='Add to playlist'
                  fontSize='20px'
                  rounded='0px'
                  icon={<PlaylistAdd color={`${theme.colors.etGreen}`} />}
                  onClick={() => this.addToPlaylist(track._id, track.type)}
                />
              </Box>

*/