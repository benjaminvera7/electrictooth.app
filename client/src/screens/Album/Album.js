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
import { PlaylistAdd, CartAdd } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import * as userActions from 'redux/modules/user';
import toast from 'util/toast';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';

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
          <meta
            name='og:url'
            content={`https://electrictooth.app/catalog/${currentAlbum.product_id}`}
          />
          <meta name='og:title' content={currentAlbum.album_name} />
          <meta name='og:description' content='amazing' />
          <meta
            name='og:image'
            content={`https://electrictooth.app/uploads/${currentAlbum.art_url}`}
          />
          <meta name='og:type' content='website' />
          <meta name='twitter:title' content={currentAlbum.album_name} />
          <meta name='twitter:description' content='amazing' />
          <meta
            name='twitter:image'
            content={`https://electrictooth.app/uploads/${currentAlbum.art_url}`}
          />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:creator' content='@princebiomass' />
        </Helmet>

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
                        <Flex
                          w='100%'
                          borderWidth='1px'
                          rounded='lg'
                          p={2}
                          key={i}
                        >
                          <Box pr={2}>
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

                          <Flex align='center' pr={4}>
                            <CartAdd
                              onClick={() => this.addToCart(song.product_id)}
                            />
                          </Flex>

                          <Flex align='center' pr={4}>
                            <PlaylistAdd
                              onClick={() =>
                                this.addToPlaylist(song.product_id)
                              }
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
