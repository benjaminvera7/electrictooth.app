import React, { Component } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Stack,
  IconButton,
} from '@chakra-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import requireAuth from 'components/AuthHOC/requireAuth';
import * as userActions from 'redux/modules/user';
import { PlaylistAdd, Download as DownloadIcon } from 'components/Icons';
import { bindActionCreators } from 'redux';
import toast from 'util/toast';

class Download extends Component {
  state = {
    downloads: {},
  };

  loadOrder = () => {
    axios({
      url: `/order/${this.props.match.params.orderId}`,
      method: 'GET',
      headers: { Authorization: this.props.auth },
    }).then(({ data }) =>
      this.setState({
        downloads: data.items,
      }),
    );
  };

  componentDidMount() {
    this.loadOrder();
    this.props.auth && this.props.UserActions.getUser(this.props.auth);
  }

  handleSubmit = (e, product_id, albumName, songName) => {
    e.preventDefault();
    axios({
      url: `/download/order/${this.props.match.params.orderId}/${product_id}`,
      method: 'GET',
      responseType: 'blob',
      headers: { Authorization: this.props.auth },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      let songFound = product_id.match(/-/g);
      if (!!songFound) {
        link.setAttribute('download', `${songName}.mp3`);
      } else {
        link.setAttribute('download', `${albumName}.zip`);
      }
      document.body.appendChild(link);
      link.click();
    });
  };

  addToPlaylist = (productId) => {
    if (this.props.auth) {
      this.props.UserActions.addToPlaylist(this.props.auth, productId);
      toast(`Saved to your Playlist`);
    } else {
      console.warn('something went wrong');
    }
  };

  render() {
    return (
      <Flex justify='center'>
        <Box color='white' maxW='1440px' flex='1'>
          <Heading px={4} pt={2} as='h2' size='2xl'>
            download
          </Heading>

          <Text px={4} fontSize='sm' mb={4} color='grey'>
            Downloads are available anytime in your Collection!
          </Text>

          <Flex justify='center' pt={2} pb={6} px={4}>
            <Heading fontSize='40px' color='#6eacdd'>
              Thank you for supporting art!
            </Heading>
          </Flex>

          <Stack m={2}>
            {this.state.downloads.length > 0 &&
              this.state.downloads.map((album) => (
                <Flex
                  py={2}
                  borderWidth='1px'
                  rounded='lg'
                  key={album.product_id}
                >
                  <Box>
                    <Image
                      src={`/uploads/${album.art_url}`}
                      maxWidth='96px'
                      px={2}
                    />
                  </Box>
                  <Box>
                    <Heading as='h6' fontSize={['sm', 'md', 'lg', 'xl']}>
                      {album.album_name && album.album_name}
                      {album.song_name && `${album.song_name} (MP3)`}
                    </Heading>
                    <Text
                      fontSize={['xs', 'sm', 'md', 'lg']}
                      mb={4}
                      color='grey'
                    >
                      {album.artist_name}
                    </Text>
                  </Box>
                  <Box mx='auto' />

                  {album.product_id.match(/coin/g) ? (
                    <Flex
                      align='center'
                      px={2}
                      direction='column'
                      justify='center'
                    >
                      <Heading fontSize={['xs', 'sm', 'md', 'lg']}>
                        {parseInt(album.product_id.substring(4, 7), 10)} coins
                      </Heading>
                    </Flex>
                  ) : (
                    <Flex
                      align='center'
                      px={2}
                      direction='column'
                      justify='center'
                    >
                      <IconButton
                        variant='solid'
                        variantColor='teal'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={DownloadIcon}
                        mb={2}
                        onClick={(e) =>
                          this.handleSubmit(
                            e,
                            album.product_id,
                            album.album_name,
                            album.song_name,
                          )
                        }
                      />
                      <IconButton
                        variant='solid'
                        variantColor='teal'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={PlaylistAdd}
                        onClick={(e) => this.addToPlaylist(album.product_id)}
                      />
                    </Flex>
                  )}
                </Flex>
              ))}
          </Stack>
        </Box>
      </Flex>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.user.authenticated,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(requireAuth(Download));
