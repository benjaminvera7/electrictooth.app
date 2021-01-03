import React, { Component, Fragment } from 'react';
import { Box, Flex, Text, Image, Heading, Stack, Badge, Button, IconButton } from '@chakra-ui/core';
import { PlaylistAdd, CartAdd, Play } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  addToCart = (id, type) => {
    if (this.props.auth) {
      this.props.UserActions.addToCart(id, type, this.props.auth);
      //toast(`Added to your Cart`);
    } else {
      this.props.history.push('/signup');
    }
  };

  addToPlaylist = (id) => {
    if (this.props.auth) {
      this.props.UserActions.addToPlaylist(this.props.auth, id);
      toast(`Saved to your Playlist`);
    } else {
      this.props.history.push('/signup');
    }
  };

  render() {
    let { pending, albums } = this.props;

    let currentAlbum = null;

    currentAlbum = albums.filter((a) => a._id === this.props.match.params.id)[0];

    return (
      <Fragment>
        {/* <Helmet>
          <title>{currentAlbum.album_name}</title>
          <meta name='description' content='amazing' />
        </Helmet> */}

        {currentAlbum && (
          <CardAnimation justify='center' py={4} mt='40px'>
            <AlbumCardContainer color='white' maxW='1440px' flex='1' px='2'>
              <Box display={{ md: 'flex' }} direction='column' bg='white'>
                <Box color='black' width='100%'>
                  <Image src={`/uploads/${currentAlbum.art_name}`} width='100%' />
                </Box>
                <Flex color='black' width='100%' justify='space-between' style={{ position: 'relative' }} pb={16}>
                  <Box color='black' width='100%' px={{ xs: 2, sm: 4 }} py={{ xs: 4, sm: 4 }}>
                    <Box d='flex' alignItems='baseline' mb={2} color='white'>
                      {currentAlbum.tags.map((tag, i) => (
                        <Badge px='2' bg={`${theme.colors.etGreen}`} variantColor='white' mr={1} key={i}>
                          {tag}
                        </Badge>
                      ))}
                    </Box>

                    <Heading
                      mb={1}
                      display='block'
                      color='gray.600'
                      fontSize={['sm', 'md', 'lg', 'xl']}
                      as='h6'
                      size='md'
                      lineHeight='normal'
                      fontWeight='semibold'
                      textAlign='left'
                    >
                      {currentAlbum.album_name}
                    </Heading>

                    <Text
                      fontWeight='light'
                      textTransform='uppercase'
                      fontSize='xs'
                      letterSpacing='wide'
                      textAlign='left'
                      color='gray.500'
                      fontSize={['xs', 'sm', 'md', 'lg']}
                    >
                      {currentAlbum.artist ? currentAlbum.artist.name : undefined}
                    </Text>

                    <Box p={4}>{currentAlbum.description}</Box>
                  </Box>

                  <Box color='black' px={{ xs: 2, sm: 4 }} py={{ xs: 2, sm: 4 }} textAlign='right'>
                    ${currentAlbum.download_price}.00
                  </Box>

                  <Flex style={{ position: 'absolute', bottom: 0, left: 0 }} width='100%'>
                    <IconButton
                      flex='1'
                      variant='ghost'
                      variantColor='teal'
                      aria-label='Add album to cart'
                      fontSize='20px'
                      style={{
                        borderTop: '1px',
                        borderRight: '1px',
                        borderStyle: 'solid',
                        borderColor: 'rgba(5, 174, 165, 0.3)',
                      }}
                      rounded='0px'
                      //icon={() => <CartAdd color={`${theme.colors.etGreen}`} />}
                      icon={() => <p>add to cart</p>}
                      onClick={() => this.addToCart(currentAlbum._id, currentAlbum.type)}
                    />
                    <IconButton
                      flex='1'
                      variant='ghost'
                      variantColor='teal'
                      aria-label='Add album to playlist'
                      fontSize='20px'
                      style={{
                        borderTop: '1px',
                        borderStyle: 'solid',
                        borderColor: 'rgba(5, 174, 165, 0.3)',
                      }}
                      rounded='0px'
                      // icon={() => (
                      //   <PlaylistAdd color={`${theme.colors.etGreen}`} />
                      // )}
                      icon={() => <p>add to playlist</p>}
                      onClick={() => this.addToPlaylist(currentAlbum._id)}
                    />
                  </Flex>
                </Flex>
              </Box>

              <AlbumSongList mt='24px'>
                <Stack spacing={4} mb={4}>
                  {currentAlbum.tracks
                    ? currentAlbum.tracks.map((track, i) => (
                        <Flex w='100%' borderWidth='1px' key={i} bg='white'>
                          <Box pr={2}>
                            <Image src={`/uploads/${track.art_name}`} maxWidth='100px' />
                          </Box>

                          <Flex direction='column' w='100%' p={2}>
                            <Text color='gray.600' fontSize={['sm', 'md', 'lg', 'xl']}>
                              <b>{track.track_name}</b>
                            </Text>
                            <Text color='gray.500' fontSize={['xs', 'sm', 'md', 'lg']}>
                              {currentAlbum.artist ? currentAlbum.artist.name : undefined}
                            </Text>
                          </Flex>

                          <Flex p={2} direction='column' justify='center' align='center'>
                            <Text px={2} color='#222'>
                              ${track.download_price}.00
                            </Text>
                          </Flex>

                          <Flex direction='column'>
                            {/*
                            
                            
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
                            />
                            */}
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
                              icon={() => <CartAdd color={`${theme.colors.etGreen}`} />}
                              onClick={() => this.addToCart(track._id, track.type)}
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
                              icon={() => <PlaylistAdd color={`${theme.colors.etGreen}`} />}
                              onClick={() => this.addToPlaylist(track._id, track.type)}
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
    albums: state.music.albums,
    albumCollection: state.user.albumCollection,
    playlist: state.user.playlist,
    auth: state.user.authenticated,
    updatedAt: state.music.updatedAt,
    pending: state.pender.pending['music/GET_ALBUMS'],
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Album);
