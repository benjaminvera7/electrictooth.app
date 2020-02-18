import React, { Component } from 'react';
import { Box, Flex, Text, Image, Heading, Stack } from '@chakra-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import requireAuth from 'components/AuthHOC/requireAuth';

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
  }

  handleSubmit = (e, product_id) => {
    e.preventDefault();
    axios({
      url: `/download/${this.props.match.params.orderId}/${product_id}`,
      method: 'GET',
      responseType: 'blob',
      headers: { Authorization: this.props.auth },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${product_id}.zip`);
      document.body.appendChild(link);
      link.click();
    });
  };

  //5e1e664d795d337ad8c25ffb
  render() {
    return (
      <Flex justify='center'>
        <Box color='white' maxW='1100px' flex='1'>
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
                    <Image src={`${album.art_url}`} maxWidth='96px' px={2} />
                  </Box>
                  <Box>
                    <Heading as='h6' size='md'>
                      {album.album_name}
                    </Heading>
                    <Text fontSize='sm' mb={4} color='grey'>
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
                      <Heading>
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
                      <Box
                        as='button'
                        rounded='md'
                        bg='#2d7bb8'
                        color='white'
                        px={2}
                        mb={2}
                        h={8}
                        width='130px'
                        onClick={(e) => this.handleSubmit(e, album.product_id)}
                      >
                        download
                      </Box>
                      <Box
                        as='button'
                        rounded='md'
                        bg='#2d7bb8'
                        color='white'
                        px={2}
                        h={8}
                        width='130px'
                      >
                        add to playlist
                      </Box>
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
  null,
)(requireAuth(Download));
