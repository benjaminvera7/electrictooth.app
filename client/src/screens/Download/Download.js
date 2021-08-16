import React, { Component } from 'react';
import { Box, Flex, Text, Image, Heading, Stack, IconButton, Icon } from '@chakra-ui/react';
import axios from 'axios';
import { connect } from 'react-redux';
import requireAuth from 'components/AuthHOC/requireAuth';
import * as userActions from 'redux/modules/user';
import { Download as DownloadIcon } from 'components/Icons';
import { bindActionCreators } from 'redux';
import toast from 'util/toast';
import theme from 'theme.js';
import Helmet from 'react-helmet';

//http://localhost:3000/download/611995458051981df4f3fc9a bonito

const PlaylistAdd = () => (
  <Icon w='50%' h='auto'>
    <svg width="21" height="26" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8713 4.95786H0.677734V6.99011H12.8713V4.95786ZM12.8713 0.893341H0.677734V2.9256H12.8713V0.893341ZM16.9358 9.02237V4.95786H14.9035V9.02237H10.839V11.0546H14.9035V15.1191H16.9358V11.0546H21.0003V9.02237H16.9358ZM0.677734 11.0546H8.80677V9.02237H0.677734V11.0546Z" fill="#89DBFF" />
    </svg>
  </Icon>
)

class Download extends Component {
  state = {
    downloads: [],
    shippingAddress: {}
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
        shippingAddress: data.shippingAddress
      });
    });
  };

  componentDidMount() {
    this.loadOrder();
    this.props.auth && this.props.UserActions.getUser();
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
      this.props.UserActions.addToPlaylist(id, type);
      toast(`Saved to your Playlist`);
    } else {
      console.warn('something went wrong');
    }
  };

  renderLineItems = (item) => {
    switch (item.type) {
      case 'album':
        return this.renderAlbumItem(item)
      case 'track':
        return this.renderTrackItem(item)
      case 'coin':
        return this.renderCoinItem(item)
      default:
        return null
    }
  }

  renderAlbumItem = (album) => {
    return (
      <Flex key={album.id} backgroundColor={`${theme.colors.etBlack}`}>
        <Box width="48px" height="48px" overflow='hidden' position='relative' >
          <Image src={`/uploads/${album.art_name}`} h='100%' w='100%' objectFit='cover' />
        </Box>

        <Flex pl={4} flexDirection="column" flexBasis='60%' justifyContent='center'>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
            {album.album_name}
          </Text>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {album.artist_name}
          </Text>
        </Flex>

        <IconButton
          mr={2}
          flex='1'
          variant='link'
          aria-label='Download album'
          icon={<DownloadIcon />}
          onClick={(e) => this.handleSubmit(e, album.id, album.type, album.album_name, album.track_name)}
        />

        <IconButton
          flex='1'
          variant='link'
          aria-label='Add to playlist'
          icon={<PlaylistAdd />}
          onClick={(e) => this.addToPlaylist(album.id, album.type)}
        />
      </Flex>
    )
  }

  renderTrackItem = (track) => {
    return (
      <Flex key={track.id} backgroundColor={`${theme.colors.etBlack}`}>
        <Box width="48px" height="48px" overflow='hidden' position='relative' >
          <Image src={`/uploads/${track.art_name}`} h='100%' w='100%' objectFit='cover' />
        </Box>

        <Flex pl={4} flexDirection="column" flexBasis='60%' justifyContent='center'>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
            {`${track.track_name} (MP3)`}
          </Text>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {track.artist_name}
          </Text>
        </Flex>

        <IconButton
          mr={2}
          flex='1'
          variant='link'
          aria-label='Download album'
          icon={<DownloadIcon />}
          onClick={(e) => this.handleSubmit(e, track.id, track.type, track.album_name, track.track_name)}
        />

        <IconButton
          flex='1'
          variant='link'
          aria-label='Add to playlist'
          icon={<PlaylistAdd />}
          onClick={(e) => this.addToPlaylist(track.id, track.type)}
        />
      </Flex>
    )
  }

  renderCoinItem = (coin) => {
    return (
      <Flex key={coin.id} backgroundColor={`${theme.colors.etBlack}`}>
        <Box width="48px" height="48px" overflow='hidden' position='relative' >
          <Image src='/uploads/coins.png' h='100%' w='100%' objectFit='cover' />
        </Box>

        <Flex pl={4} flexDirection="column" flexBasis='60%' justifyContent='center' style={{ fontFamily: 'Spotify-Bold' }}>
          {parseInt(coin.amount)} coins
        </Flex>
      </Flex>
    )
  }



  render() {
    return (
      <>
        <Helmet>
          <title>Electric Tooth - download</title>
          <meta name='description' content='amazing' />
        </Helmet>
        <Flex justify='center' mt='40px' backgroundColor={`${theme.colors.etBlack}`}>
          <Box color='white' maxW='768px' flex='1'>
            <Heading px={4} py={2} as='h2' size='2xl' color='white' fontFamily='Spotify-Bold'>
              Download
            </Heading>

            <Text px={4} fontSize='sm' mb={4} color='white' fontFamily='Spotify-Light'>
              Downloads are available anytime in your Libary!
            </Text>

            <Flex justify='center' pt={2} pb={6} px={4}>
              <Heading fontSize={{ sm: '30px', md: '40px' }} color={`${theme.colors.etViolet}`} fontFamily='Spotify-Bold'>
                Thank you for supporting art!
              </Heading>
            </Flex>

            <Stack px={4}>
              {this.state.downloads.length > 0 && this.state.downloads.map((item) => this.renderLineItems(item))}
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

/*
              {this.state.downloads.length > 0 &&
                this.state.downloads.map((album) => (
                  <Flex key={album.id} backgroundColor={`${theme.colors.etBlack}`}>
                    <Box width="48px" height="48px" overflow='hidden' position='relative' >
                      <Image src={`/uploads/${album.art_name}`} h='100%' w='100%' objectFit='cover' />
                    </Box>
                    <Box p={2} width={{ xs: '50%', md: '80%' }} flexBasis='60%'>
                      <Heading as='h6' fontSize={['sm', 'md', 'lg', 'xl']} color='white'>
                        {album.album_name && album.album_name}
                        {album.track_name && `${album.track_name} (MP3)`}
                        {album.product_name && `${album.product_name} (${album.size})`}
                      </Heading>
                      <Text fontSize={['xs', 'sm', 'md', 'lg']} mb={4} color='white'>
                        {album.artist_name}
                      </Text>
                    </Box>

                    {album.product_name &&
                      <Box width={{ xs: '50%', md: '20%' }} p="8px">
                        <Text fontSize={['xs']} mb={4} color='white'>
                          <b>Shipping To:</b>
                          <div>{this.state.shippingAddress.recipient_name}</div>
                          <div>{this.state.shippingAddress.line1}</div>
                          <div>{this.state.shippingAddress.city}, {this.state.shippingAddress.state}</div>
                          <div>{this.state.shippingAddress.postal_code}</div>
                          <div>{this.state.shippingAddress.country_code}</div>
                        </Text>
                      </Box>
                    }


                    {album.type === 'coin' && (
                      <Flex align='center' px={2} direction='column' justify='center' width="100%">
                        <Heading as='h6' fontSize={['sm', 'md', 'lg', 'xl']} color='white' margin="auto" >
                          {parseInt(album.amount)} stream coins have been added to your account!
                        </Heading>
                      </Flex>
                    )}

                    {(album.album_name || album.track_name) &&
                      <>
                        <IconButton
                          flex='1'
                          variant='link'
                          aria-label='Download album'
                          icon={<DownloadIcon />}
                          onClick={(e) => this.handleSubmit(e, album.id, album.type, album.album_name, album.track_name)}
                        />

                        <IconButton
                          flex='1'
                          variant='link'
                          aria-label='Add to playlist'
                          icon={<PlaylistAdd />}
                          onClick={(e) => this.addToPlaylist(album.id, album.type)}
                        />
                      </>
                    }

                  </Flex>
                ))}

*/
