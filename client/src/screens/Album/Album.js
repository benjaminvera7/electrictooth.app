import React, { Component, Fragment } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Stack,
  Badge,
  Button,
} from '@chakra-ui/core';
import { PlaylistAdd } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import * as userActions from 'redux/modules/user';
import * as playerActions from 'redux/modules/player';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const AlbumCardContainer = styled(Box)``;

const AlbumSongList = styled(Box)``;

const AlbumCard = styled(Flex)``;

const CardAnimation = styled(Flex)`
  ${FADE_IN}
`;

class Album extends Component {
  loadAlbum = async () => {
    const { AlbumActions, match } = this.props;
    await AlbumActions.getAlbumById(match.params.id);
  };

  componentDidMount() {
    this.loadAlbum();
  }

  addAlbumToCart = () => {
    if (this.props.auth) {
      this.props.UserActions.addToCart(
        this.props.currentAlbum.product_id,
        this.props.auth,
      );
    } else {
      this.props.history.push('/signup');
    }
  };

  addSongToCart = () => {};

  addAlbumToPlaylist = () => {
    if (this.props.auth) {
      this.props.PlayerActions.addAlbumToPlaylist(
        this.props.auth,
        this.props.currentAlbum._id,
      );
    } else {
      this.props.history.push('/signup');
    }
  };

  addSongToPlaylist = (songId) => {
    if (this.props.auth) {
      this.props.PlayerActions.addSongToPlaylist(this.props.auth, songId);
    } else {
      this.props.history.push('/signup');
    }
  };

  render() {
    let { pending, currentAlbum } = this.props;

    let exists;

    exists = this.props.albumCollection.filter(
      (ac) => ac.id === currentAlbum._id,
    );

    return (
      <Fragment>
        {!pending && (
          <CardAnimation justify='center'>
            <AlbumCardContainer color='white' maxW='1100px' flex='1'>
              <AlbumCard
                className='card'
                width='100%'
                wrap='wrap'
                p={2}
                borderWidth='1px'
                rounded='lg'
                my={2}
              >
                <Box className='card_image'>
                  <Image
                    src={`/uploads/${currentAlbum.art_url}`}
                    rounded='lg'
                  />
                </Box>

                <Box className='card_description'>
                  <Heading
                    mb={1}
                    display='block'
                    fontSize={['sm', 'md', 'lg', 'xl']}
                    as='h6'
                    size='md'
                    lineHeight='normal'
                    fontWeight='semibold'
                    textAlign='right'
                    color='#6eacdd'
                  >
                    {currentAlbum.album_name}
                  </Heading>

                  <Text
                    fontWeight='light'
                    textTransform='uppercase'
                    fontSize='xs'
                    letterSpacing='wide'
                    textAlign='right'
                    color='grey'
                  >
                    {currentAlbum.artist ? currentAlbum.artist.name : undefined}
                  </Text>

                  <Text
                    display='block'
                    fontSize='md'
                    mb={1}
                    lineHeight='normal'
                    textAlign='right'
                    color='#e2f4ff'
                  >
                    $ {currentAlbum.download_price}
                  </Text>

                  <Badge fontSize='0.6em' variantColor='teal' ml={1} mr={1}>
                    NuDisco
                  </Badge>
                  <Badge fontSize='0.6em' variantColor='teal' mr={1}>
                    House
                  </Badge>
                  <Badge fontSize='0.6em' variantColor='teal' mr={1}>
                    Indie
                  </Badge>

                  <Text
                    my={2}
                    mb={2}
                    px={2}
                    fontSize='sm'
                    lineHeight='normal'
                    fontWeight='light'
                  >
                    yeet
                  </Text>
                </Box>

                {exists.length === 0 ? (
                  <Button
                    mt={1}
                    width='100%'
                    bg='#2d7bb8'
                    onClick={this.addAlbumToCart}
                  >
                    Buy Digital Album
                  </Button>
                ) : (
                  <Button
                    mt={1}
                    width='100%'
                    bg='#2d7bb8'
                    onClick={() => this.props.history.push('/profile')}
                  >
                    View in Collection
                  </Button>
                )}

                <Button
                  mt={1}
                  width='100%'
                  bg='#134468'
                  onClick={this.addAlbumToPlaylist}
                >
                  Add Album to Player
                </Button>
              </AlbumCard>

              <AlbumSongList mt='24px'>
                <Stack spacing={4} mb={4}>
                  {currentAlbum.songs
                    ? currentAlbum.songs.map((song, i) => (
                        <Flex
                          w='100%'
                          borderWidth='1px'
                          rounded='lg'
                          p={2}
                          key={i}
                        >
                          <Box>
                            <Image
                              src={`/uploads/${song.art_url}`}
                              maxWidth='96px'
                            />
                          </Box>

                          <Flex direction='column' pl={1} w='100%'>
                            <Text
                              color='white'
                              fontSize={['sm', 'md', 'lg', 'xl']}
                            >
                              {song.song_name}
                            </Text>
                            <Text
                              color='gray.600'
                              fontSize={['sm', 'md', 'lg', 'xl']}
                            >
                              {currentAlbum.artist
                                ? currentAlbum.artist.name
                                : undefined}
                            </Text>
                          </Flex>

                          <Flex align='center' pr={2}>
                            <PlaylistAdd
                              onClick={() => this.addSongToPlaylist(song._id)}
                            />
                          </Flex>
                        </Flex>
                      ))
                    : undefined}
                </Stack>
              </AlbumSongList>
            </AlbumCardContainer>
          </CardAnimation>
        )}
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    albumCollection: state.user.albumCollection,
    currentAlbum: state.album.currentAlbum,
    playlist: state.player.playlist,
    auth: state.user.authenticated,
    updatedAt: state.album.updatedAt,
    pending: state.pender.pending['album/GET_ALBUM_BY_ID'],
  }),
  (dispatch) => ({
    AlbumActions: bindActionCreators(albumActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    PlayerActions: bindActionCreators(playerActions, dispatch),
  }),
)(Album);
