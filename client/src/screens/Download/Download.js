import React, { Component } from 'react';
import { Box, Flex, Text, Image, Heading, Stack, IconButton } from '@chakra-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import requireAuth from 'components/AuthHOC/requireAuth';
import * as userActions from 'redux/modules/user';
import { PlaylistAdd, Download as DownloadIcon } from 'components/Icons';
import { bindActionCreators } from 'redux';
import toast from 'util/toast';
import theme from 'theme.js';

class Download extends Component {
  state = {
    downloads: {},
  };

  loadOrder = () => {
    axios({
      url: `/order/${this.props.match.params.orderId}`,
      method: 'GET',
      headers: { Authorization: this.props.auth },
    }).then(({ data }) => {
      console.log(data);
      this.setState({
        downloads: data.cart.items,
      });
    });
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
      <Flex justify='center' mt='40px'>
        <Box color='white' maxW='1440px' flex='1'>
          <Heading px={4} py={2} as='h2' size='2xl' color={`${theme.colors.etGreen}`}>
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

          <Stack px={{ xs: 2, xl: 0 }}>
            {this.state.downloads.length > 0 &&
              this.state.downloads.map((album) => (
                <Flex borderWidth='1px' bg='white' key={album.product_id}>
                  <Box>
                    <Image src={`/uploads/${album.img_url}`} maxWidth='165px' />
                  </Box>
                  <Box p={2}>
                    <Heading as='h6' fontSize={['sm', 'md', 'lg', 'xl']} color='gray.600'>
                      {album.album_name && album.album_name}
                      {album.song_name && `${album.song_name} (MP3)`}
                    </Heading>
                    <Text fontSize={['xs', 'sm', 'md', 'lg']} mb={4} color='gray.500'>
                      {album.artist_name}
                    </Text>
                  </Box>
                  <Box mx='auto' />

                  {album.product_id.match(/coin/g) ? (
                    <Flex align='center' px={2} direction='column' justify='center'>
                      <Heading as='h6' fontSize={['sm', 'md', 'lg', 'xl']} color='gray.600'>
                        {parseInt(album.product_id.substring(4, 7), 10)} coins
                      </Heading>
                    </Flex>
                  ) : (
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
                        icon={() => <DownloadIcon color={`${theme.colors.etGreen}`} />}
                        onClick={(e) => this.handleSubmit(e, album.product_id, album.album_name, album.song_name)}
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
