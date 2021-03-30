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
import Helmet from 'react-helmet';


class Download extends Component {
  state = {
    downloads: {},
  };

  loadOrder = () => {
    axios({
      url: `/api/v1/order/${this.props.match.params.orderId}`,
      method: 'GET',
      headers: { Authorization: this.props.auth },
    }).then(({ data }) => {
      console.log(data.cart.items)
      this.setState({
        downloads: data.cart.items,
      });
    });
  };

  componentDidMount() {
    this.loadOrder();
    this.props.auth && this.props.UserActions.getUser(this.props.auth);
  }

  handleSubmit = (e, id, type, album_name, track_name) => {
    e.preventDefault();
    axios({
      url: `/api/v1/download/order/${this.props.match.params.orderId}/${id}`,
      method: 'GET',
      responseType: 'blob',
      headers: { Authorization: this.props.auth },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = url;

      if (type === 'track') {
        link.setAttribute('download', `${track_name}.mp3`);
      } else {
        link.setAttribute('download', `${album_name}.zip`);
      }

      document.body.appendChild(link);
      link.click();
    });
  };

  addToPlaylist = (id, type) => {
    if (this.props.auth) {
      this.props.UserActions.addToPlaylist(id, type, this.props.auth);
      toast(`Saved to your Playlist`);
    } else {
      console.warn('something went wrong');
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Electric Tooth - download</title>
          <meta name='description' content='amazing' />
        </Helmet>
        <Flex justify='center' mt='40px'>
          <Box color='white' maxW='768px' flex='1'>
            <Heading px={4} py={2} as='h2' size='2xl' color={`${theme.colors.etGreen}`}>
              download
          </Heading>

            <Text px={4} fontSize='sm' mb={4} color='grey'>
              Downloads are available anytime in your Libary!
          </Text>

            <Flex justify='center' pt={2} pb={6} px={4}>
              <Heading fontSize={{ sm: '30px', md: '40px' }} color='#6eacdd'>
                Thank you for supporting art!
            </Heading>
            </Flex>

            <Stack px={{ xs: 2, xl: 0 }}>
              {this.state.downloads.length > 0 &&
                this.state.downloads.map((album) => (
                  <Flex borderWidth='1px' bg='white' key={album.id} borderRadius="20px" boxShadow='0 2px 4px 0 rgba(0,0,0,.25)'>
                    <Box>
                      <Image src={`/uploads/${album.art_name}`} maxWidth='165px' borderRadius="20px 0 0 20px" />
                    </Box>
                    <Box p={2}>
                      <Heading as='h6' fontSize={['sm', 'md', 'lg', 'xl']} color='gray.600'>
                        {album.album_name && album.album_name}
                        {album.track_name && `${album.track_name} (MP3)`}
                      </Heading>
                      <Text fontSize={['xs', 'sm', 'md', 'lg']} mb={4} color='gray.500'>
                        {album.artist_name}
                      </Text>
                    </Box>
                    <Box mx='auto' />

                    {album.type === 'coin' ? (
                      <Flex align='center' px={2} direction='column' justify='center' width="100%">
                        <Heading as='h6' fontSize={['sm', 'md', 'lg', 'xl']} color='gray.600' margin="auto" >
                          {parseInt(album.amount)} stream coins have been added to your account!
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
                          onClick={(e) => this.handleSubmit(e, album.id, album.type, album.album_name, album.track_name)}
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
                          onClick={(e) => this.addToPlaylist(album.id, album.type)}
                        />
                      </Flex>
                    )}
                  </Flex>
                ))}
            </Stack>
          </Box>
        </Flex>
      </>
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
