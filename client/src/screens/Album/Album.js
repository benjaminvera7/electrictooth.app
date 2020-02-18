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
import { Play, PlaylistAdd } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import * as userActions from 'redux/modules/user';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const Card = styled(Flex)`
  ${FADE_IN}
`;

class Album extends Component {
  loadAlbum = async () => {
    const { AlbumActions, match } = this.props;
    await AlbumActions.getAlbumById(match.params.id);
  };

  componentDidMount() {
    this.loadAlbum();
    this.setState(this.props.currentAlbum);
  }

  render() {
    let { pending, currentAlbum } = this.props;

    return (
      <Fragment>
        {!pending && (
          <Card justify='center'>
            <Box color='white' maxW='1100px' flex='1'>
              <Flex
                className='card'
                width='100%'
                wrap='wrap'
                p={2}
                borderWidth='1px'
                rounded='lg'
                my={2}
              >
                <Box className='card_image'>
                  <Image src={`${currentAlbum.art_url}`} />
                </Box>

                <Box className='card_description'>
                  <Heading
                    mb={1}
                    display='block'
                    fontSize='xl'
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

                  <Badge fontSize='0.6em' variantColor='teal' ml={2} mr={1}>
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
                    Mundi facilisis vituperata eam ea, tacimates convenire
                    definitiones cum at. His possit aeterno singulis ex, noster
                    debitis sea et.
                  </Text>
                </Box>

                <Button
                  mt={1}
                  width='100%'
                  bg='#2d7bb8'
                  onClick={() =>
                    this.props.UserActions.addToCart(
                      this.props.currentAlbum.product_id,
                      this.props.auth,
                    )
                  }
                >
                  Buy Digital Album
                </Button>

                <Button mt={1} width='100%' bg='#134468'>
                  Add Album to Player
                </Button>
              </Flex>

              <Box mt='24px'>
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
                              src={`${song.art_url}`}
                              maxWidth='96px'
                              px={2}
                            />
                          </Box>

                          <Flex direction='column' pl={1}>
                            <Text color='white'>{song.song_name}</Text>
                            <Text color='gray.600'>
                              {currentAlbum.artist
                                ? currentAlbum.artist.name
                                : undefined}
                            </Text>
                          </Flex>

                          <Box mx='auto' />

                          <Flex
                            align='center'
                            minWidth='100px'
                            justify='space-evenly'
                          >
                            <Play />
                            <PlaylistAdd />
                          </Flex>
                        </Flex>
                      ))
                    : undefined}
                </Stack>
              </Box>
            </Box>
          </Card>
        )}
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    currentAlbum: state.album.currentAlbum,
    auth: state.user.authenticated,
    updatedAt: state.album.updatedAt,
    pending: state.pender.pending['album/GET_ALBUM_BY_ID'],
  }),
  (dispatch) => ({
    AlbumActions: bindActionCreators(albumActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Album);
