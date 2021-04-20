import React from 'react';
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
} from '@chakra-ui/core';
import { Toll, PlaylistAdd, Download } from 'components/Icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import requireAuth from 'components/AuthHOC/requireAuth';
import axios from 'axios';
import toast from 'util/toast';
import theme from 'theme.js';
import Helmet from 'react-helmet';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const ProfileCard = styled(Box)`
  ${FADE_IN}
`;

const Profile = ({ UserActions, user, auth, history, library }) => {
  const addToPlaylist = (id, type) => {
    if (auth) {
      UserActions.addToPlaylist(id, type, auth);
      toast(`Saved to your Playlist`);
    } else {
      console.warn('something went wrong');
    }
  };

  const handleSubmit = (e, id, type, album_name, track_name) => {
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

  return (
    <>
      <Helmet>
        <title>Electric Tooth - profile</title>
        <meta name='description' content='amazing' />
      </Helmet>

      <Flex justify='center' mt='40px'>
        <ProfileCard color='white' maxW='900px' flex='1' mb={4} px={4}>
          <Flex justify='space-between'>
            <Heading py={2} as='h2' size='2xl' color={`${theme.colors.etGreen}`}>
              {user.username}
            </Heading>

            <Heading py={5} as='h2' size='md' color={`${theme.colors.etGreen}`}>
              <Flex align='center'>
                <Box pr={2}>
                  <Toll height='26px' width='26px' />
                </Box>
                {user.coins}
              </Flex>
            </Heading>
          </Flex>

          <Tabs isFitted color={`${theme.colors.etGreen}`} variantColor={`${theme.colors.etGreen}`}>
            <TabList mb='1em'>
              <Tab>Library</Tab>
              <Tab>Order History</Tab>
              <Tab>Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack px={{ xs: 2, xl: 0 }}>
                  {library.length > 0 ? (
                    library.map((album, i) => (
                      <Flex borderWidth='1px' key={i} bg='white' borderRadius="20px" boxShadow='0 2px 4px 0 rgba(0,0,0,.25)'>
                        <Box>
                          <Link to={`/music/${album.album_name.replaceAll('-', ' ')}`}>
                            <Image src={`/uploads/${album.art_name}`} maxWidth='100px' borderRadius="20px 0 0 20px" />
                          </Link>
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
                            icon={() => <Download color={`${theme.colors.etGreen}`} />}
                            onClick={(e) => handleSubmit(e, album._id, album.type, album.album_name, album.track_name)}
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
                            onClick={() => addToPlaylist(album._id, album.type)}
                          />
                        </Flex>
                      </Flex>
                    ))
                  ) : (
                    <Flex justify='center' color='grey'>
                      <Box fontSize='sm' py={2} color='grey'>
                        <span>
                          your collection is empty.{' '}
                          <Link onClick={() => history.push('/')} style={{ color: theme.colors.etGreen }}>
                            check out our catalog!
                        </Link>
                        </span>
                      </Box>
                    </Flex>
                  )}
                </Stack>
              </TabPanel>
              <TabPanel>
                order history
              </TabPanel>
              <TabPanel>
                <Flex justify='flex-end'>
                  <Button
                    size='sm'
                    variant='solid'
                    bg='#E63946'
                    color='white'
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
    </>
  );
};

export default connect(
  (state) => ({
    user: state.user,
    auth: state.user.authenticated,
    library: state.user.library,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(requireAuth(Profile));
