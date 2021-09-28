import React, { useEffect } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  IconButton,
  useToast,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody
} from '@chakra-ui/react';
import { Toll } from 'components/Icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import requireAuth from 'components/AuthHOC/requireAuth';
import axios from 'axios';
import theme from 'theme.js';
import Helmet from 'react-helmet';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const ProfileCard = styled(Box)`
  ${FADE_IN}
`;


const PlaylistAdd = () => (
  <Flex h='48px' alignItems='center'>
    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8713 4.95783H0.677734V6.99008H12.8713V4.95783ZM12.8713 0.893311H0.677734V2.92557H12.8713V0.893311ZM16.9358 9.02234V4.95783H14.9035V9.02234H10.839V11.0546H14.9035V15.1191H16.9358V11.0546H21.0003V9.02234H16.9358ZM0.677734 11.0546H8.80677V9.02234H0.677734V11.0546Z" fill="#89DBFF" />
    </svg>
  </Flex>
);

const Download = () => (
  <Flex h='48px' alignItems='center'>
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 0.5V12.125" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" />
      <path d="M4.5 7.625L9 12.125L13.5 7.625" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" />
      <path d="M1.125 15.5H16.875" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" />
    </svg>
  </Flex>
)

const Profile = ({ UserActions, user, auth, history, library, orders }) => {
  const toast = useToast();

  useEffect(() => {
    auth && UserActions.getOrders(auth);
  }, [auth, UserActions]);

  const addToPlaylist = (id, type) => {
    if (auth) {
      UserActions.addToPlaylist(id, type, auth);
      toast({
        title: "Added to playlist",
        duration: 2000,
        status: 'success',
        isClosable: true,
      })
    } else {
      console.warn('something went wrong');
    }
  };

  const handleSubmit = (e, id, type, album_name, track_name) => {
    toast({
      title: "Starting download...",
      duration: 6000,
      status: 'success',
      isClosable: true,
    })

    e.preventDefault();

    axios({
      url: `/api/v1/download/${id}`,
      method: 'GET',
      responseType: 'blob',
      headers: { Authorization: auth },
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

  const renderLineItems = (item) => {
    switch (item.type) {
      case 'album':
        return renderAlbumItem(item)
      case 'track':
        return renderTrackItem(item)
      default:
        return null
    }
  }

  const renderAlbumItem = (album) => {
    return (
      <Flex alignItems='center'>
        <Box width="48px" height="48px" overflow='hidden' position='relative' >
          <Link to={`/music/${album.album_name.replaceAll('-', ' ')}`}>
            <Image src={`/uploads/${album.art_name}`} h='100%' w='100%' objectFit='cover' />
          </Link>
        </Box>
        <Flex pl={4} flexDirection="column" justifyContent='center' flex='2'>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='180px' isTruncated>
            {`${album.album_name}`}
          </Text>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {album.artist_name}
          </Text>
        </Flex>
        <Flex w='48px' justifyContent='center' alignItems='center'>
          <IconButton
            variant='link'
            aria-label='Download album'
            icon={<Download />}
            onClick={(e) => handleSubmit(e, album._id, album.type, album.album_name, album.track_name)}
          />
        </Flex>
        <Flex w='48px' justifyContent='center' alignItems='center'>
          <IconButton
            variant='link'
            aria-label='Add to playlist'
            icon={<PlaylistAdd />}
            onClick={() => addToPlaylist(album._id, album.type)}
          />
        </Flex>
      </Flex>
    )
  }
  const renderTrackItem = (track) => {
    return (
      <Flex alignItems='center'>
        <Box width="48px" height="48px" overflow='hidden' position='relative' >
          <Link to={`/music/${track.album_name.replaceAll('-', ' ')}`}>
            <Image src={`/uploads/${track.art_name}`} h='100%' w='100%' objectFit='cover' />
          </Link>
        </Box>
        <Flex pl={4} flexDirection="column" justifyContent='center' flex='2'>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='180px' isTruncated>
            {`${track.track_name} (MP3)`}
          </Text>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {track.artist_name}
          </Text>
        </Flex>
        <Flex w='48px' justifyContent='center' alignItems='center'>
          <IconButton
            variant='link'
            aria-label='Download track'
            icon={<Download />}
            onClick={(e) => handleSubmit(e, track._id, track.type, track.album_name, track.track_name)}
          />
        </Flex>
        <Flex w='48px' justifyContent='center' alignItems='center'>
          <IconButton
            variant='link'
            aria-label='Add to playlist'
            icon={<PlaylistAdd />}
            onClick={() => addToPlaylist(track._id, track.type)}
          />
        </Flex>
      </Flex>
    )
  }

  const renderDate = (date) => {
    return new Date(date).toISOString().substring(0, 10);
  }

  const renderOrderLineItem = (item) => {
    switch (item.type) {
      case 'album':
        return <Box color='white'>{item.artist_name} - {item.album_name}</Box>
      case 'track':
        return <Box color='white'>{item.artist_name} - {item.track_name}</Box>
      case 'coin':
        return <Box color='white'>{item.amount} coins</Box>
      default:
        return null
    }
  }

  return (
    <Box backgroundColor={`${theme.colors.etBlack}`} px={4}>
      <Helmet>
        <title>Electric Tooth - profile</title>
        <meta name='description' content='amazing' />
      </Helmet>

      <Flex justify='center' mt='48px'>
        <ProfileCard color='white' maxW='900px' flex='1' mb={4} px={4}>
          <Flex justify='space-between'>
            <Heading py={2} as='h2' size='2xl' color='white' fontFamily='Spotify-Bold'>
              {user.username}
            </Heading>

            <Heading py={5} as='h2' size='md' color={`${theme.colors.etBlue}`}>
              <Flex align='center' fontFamily='Spotify-Light'>
                <Box pr={2}>
                  <Toll height='26px' width='26px' />
                </Box>
                {user.coins}
              </Flex>
            </Heading>
          </Flex>

          <Tabs isFitted colorScheme='cyan'>
            <TabList mb='1em'>
              <Tab><Text fontSize="14px" fontFamily='Spotify-Bold'>Library</Text></Tab>
              <Tab><Text fontSize="14px" fontFamily='Spotify-Bold'>Order History</Text></Tab>
              <Tab><Text fontSize="14px" fontFamily='Spotify-Bold'>Settings</Text></Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <Stack>
                  {library.length > 0
                    ? library.map((item, i) => renderLineItems(item))
                    : (
                      <Flex justify='center' color='grey'>
                        <Box fontSize='sm' py={2} color='grey'>
                          <span>
                            your collection is empty.{' '}
                            <Link onClick={() => history.push('/')} style={{ color: '#00a3c4' }}>
                              check out our catalog!
                            </Link>
                          </span>
                        </Box>
                      </Flex>
                    )}
                </Stack>
              </TabPanel>
              <TabPanel px={0}>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th color='white'>Order #</Th>
                      <Th color='white'>Items</Th>
                      <Th color='white' isNumeric>Order Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders.length > 0
                      && orders.map((order, i) =>
                        <Tr key={i}>
                          <Td>{order._id.substring(0, 7)}</Td>
                          <Td>
                            {order.cart.items.map(item => renderOrderLineItem(item))}
                          </Td>
                          <Td isNumeric>{renderDate(order.updated_at)}</Td>
                        </Tr>
                      )}
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
                <Flex justify='flex-end'>
                  <Button
                    isFullWidth={true}
                    variant='solid'
                    bg={`${theme.colors.etBlue}`}
                    color='black'
                    fontFamily='Spotify-Light'
                    onClick={() => {
                      UserActions.signOut();
                      history.push('/signin');
                    }}
                  >
                    Log out
                  </Button>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ProfileCard>
      </Flex>
    </Box>
  );
};

export default connect(
  (state) => ({
    user: state.user,
    orders: state.user.orders,
    auth: state.user.authenticated,
    library: state.user.library,
    updatedAt: state.music.updatedAt,
    updatedUserAt: state.user.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(requireAuth(Profile));
