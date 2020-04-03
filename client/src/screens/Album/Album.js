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
  IconButton,
} from '@chakra-ui/core';
import { PlaylistAdd, CartAdd, Play } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import * as userActions from 'redux/modules/user';
import toast from 'util/toast';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import theme from 'theme.js';

const AlbumCardContainer = styled(Box)``;

const AlbumSongList = styled(Box)``;

const AlbumCard = styled(Flex)``;

const CardAnimation = styled(Flex)`
  ${FADE_IN}
`;

class Album extends Component {
  loadAlbum = async () => {
    const { AlbumActions, match } = this.props;
    await AlbumActions.getAlbumById(match.params.productId);
  };

  componentDidMount() {
    this.loadAlbum();
  }

  addToCart = (productId) => {
    if (this.props.auth) {
      this.props.UserActions.addToCart(productId, this.props.auth);
      toast(`Added to your Cart`);
    } else {
      this.props.history.push('/signup');
    }
  };

  addToPlaylist = (productId) => {
    if (this.props.auth) {
      this.props.UserActions.addToPlaylist(this.props.auth, productId);
      toast(`Saved to your Playlist`);
    } else {
      this.props.history.push('/signup');
    }
  };

  render() {
    let { pending, currentAlbum } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{currentAlbum.album_name}</title>
          <meta name='description' content='amazing' />
        </Helmet>

        {!pending && (
          <CardAnimation justify='center'>
            <AlbumCardContainer
              color='white'
              maxW='1100px'
              flex='1'
              px={{ xs: 2, lg: 0 }}
            >
              <AlbumCard
                className='card'
                width='100%'
                wrap='wrap'
                p={2}
                borderWidth='1px'
                rounded='lg'
                my={2}
                bg='white'
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
                    color='gray.600'
                    fontSize={['sm', 'md', 'lg', 'xl']}
                    as='h6'
                    size='md'
                    lineHeight='normal'
                    fontWeight='semibold'
                    textAlign='right'
                  >
                    {currentAlbum.album_name}
                  </Heading>

                  <Text
                    fontWeight='light'
                    textTransform='uppercase'
                    fontSize='xs'
                    letterSpacing='wide'
                    textAlign='right'
                    color='gray.500'
                    fontSize={['xs', 'sm', 'md', 'lg']}
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

                <Button
                  mt={1}
                  width='100%'
                  bg='#2d7bb8'
                  onClick={() => this.addToCart(currentAlbum.product_id)}
                >
                  Buy Digital Album
                </Button>

                <Button
                  mt={1}
                  width='100%'
                  bg='#134468'
                  onClick={() => this.addToPlaylist(currentAlbum.product_id)}
                >
                  Add Album to Player
                </Button>
              </AlbumCard>

              <AlbumSongList mt='24px'>
                <Stack spacing={4} mb={4}>
                  {currentAlbum.songs
                    ? currentAlbum.songs.map((song, i) => (
                        <Flex w='100%' borderWidth='1px' key={i} bg='white'>
                          <Box pr={2}>
                            <Image
                              src={`/uploads/${song.art_url}`}
                              maxWidth='100px'
                            />
                          </Box>

                          <Flex direction='column' w='100%' p={2}>
                            <Text
                              color='gray.600'
                              fontSize={['sm', 'md', 'lg', 'xl']}
                            >
                              <b>{song.song_name}</b>
                            </Text>
                            <Text
                              color='gray.500'
                              fontSize={['xs', 'sm', 'md', 'lg']}
                            >
                              {currentAlbum.artist
                                ? currentAlbum.artist.name
                                : undefined}
                            </Text>
                          </Flex>

                          <Flex direction='column'>
                            <IconButton
                              flex='1'
                              variant='ghost'
                              variantColor='teal'
                              aria-label='Download album'
                              fontSize='20px'
                              style={{
                                borderLeft: '1px',
                                borderBottom: '1px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(5, 174, 165, 0.3)',
                              }}
                              rounded='0px'
                              icon={() => (
                                <Play color={`${theme.colors.etGreen}`} />
                              )}
                              //onClick={() => this.addToCart(song.product_id)}
                            />
                            <IconButton
                              flex='1'
                              variant='ghost'
                              variantColor='teal'
                              aria-label='Download album'
                              fontSize='20px'
                              style={{
                                borderLeft: '1px',
                                borderBottom: '1px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(5, 174, 165, 0.3)',
                              }}
                              rounded='0px'
                              icon={() => (
                                <CartAdd color={`${theme.colors.etGreen}`} />
                              )}
                              onClick={() => this.addToCart(song.product_id)}
                            />
                            <IconButton
                              flex='1'
                              variant='ghost'
                              variantColor='teal'
                              aria-label='Add to playlist'
                              fontSize='20px'
                              rounded='0px'
                              style={{
                                borderLeft: '1px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(5, 174, 165, 0.3)',
                              }}
                              icon={() => (
                                <PlaylistAdd
                                  color={`${theme.colors.etGreen}`}
                                />
                              )}
                              onClick={() =>
                                this.addToPlaylist(song.product_id)
                              }
                            />
                          </Flex>

                          {/* <Flex align='center' pr={4}>
                            <CartAdd
                              color={`${theme.colors.etGreen}`}
                              onClick={() => this.addToCart(song.product_id)}
                            />
                          </Flex>

                          <Flex align='center' pr={4}>
                            <PlaylistAdd
                              color={`${theme.colors.etGreen}`}
                              onClick={() =>
                                this.addToPlaylist(song.product_id)
                              }
                            />
                          </Flex> */}
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
    playlist: state.user.playlist,
    auth: state.user.authenticated,
    updatedAt: state.album.updatedAt,
    pending: state.pender.pending['album/GET_ALBUM_BY_ID'],
  }),
  (dispatch) => ({
    AlbumActions: bindActionCreators(albumActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Album);
