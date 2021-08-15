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
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { Toll, Download } from 'components/Icons';
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


const PlaylistAdd = () => (
  <Icon>
    <svg width="24" height="30" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.8571 5.61905H0V8.42857H16.8571V5.61905ZM16.8571 0H0V2.80952H16.8571V0ZM22.4762 11.2381V5.61905H19.6667V11.2381H14.0476V14.0476H19.6667V19.6667H22.4762V14.0476H28.0952V11.2381H22.4762ZM0 14.0476H11.2381V11.2381H0V14.0476Z" fill="#89DBFF" />
    </svg>
  </Icon>
);

const Profile = ({ UserActions, user, auth, history, library }) => {
  const addToPlaylist = (id, type) => {
    if (auth) {
      UserActions.addToPlaylist(id, type);
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

  //http://localhost:3000/download/6118a5599811a50c786bb2e4
  return (
    <>
      <Helmet>
        <title>Electric Tooth - profile</title>
        <meta name='description' content='amazing' />
      </Helmet>

      <Flex justify='center' mt='48px' backgroundColor={`${theme.colors.etBlack}`}>
        <ProfileCard color='white' maxW='900px' flex='1' mb={4} px={4}>
          <Flex justify='space-between'>
            <Heading py={2} as='h2' size='2xl' color='white' fontFamily='Spotify-Bold'>
              {user.username}
            </Heading>

            <Heading py={5} as='h2' size='md' color={`${theme.colors.etBlue}`}>
              <Flex align='center'>
                <Box pr={2}>
                  <Toll height='26px' width='26px' />
                </Box>
                {user.coins}
              </Flex>
            </Heading>
          </Flex>

          <Tabs isFitted colorScheme='cyan' >
            <TabList mb='1em'>
              <Tab><Text fontSize="14px" fontFamily='Spotify-Bold'>Library</Text></Tab>
              <Tab><Text fontSize="14px" fontFamily='Spotify-Bold'>Order History</Text></Tab>
              <Tab><Text fontSize="14px" fontFamily='Spotify-Bold'>Settings</Text></Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack px={{ xs: 2, xl: 0 }}>
                  {library.length > 0 ? (
                    library.map((album, i) => (
                      <Flex alignItems='center'>
                        <Box width="48px" height="48px" overflow='hidden' position='relative' >
                          <Link to={`/music/${album.album_name.replaceAll('-', ' ')}`}>
                            <Image src={`/uploads/${album.art_name}`} h='100%' w='100%' objectFit='cover' />
                          </Link>
                        </Box>
                        <Flex pl={4} flexDirection="column" flexBasis='60%' justifyContent='center'>
                          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
                            {album.track_name
                              ? `${album.track_name} (MP3)`
                              : `${album.album_name} (EP)`
                            }
                          </Text>
                          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
                            {album.artist_name}
                          </Text>
                        </Flex>

                        <IconButton
                          mr={2}
                          variant='link'
                          height='32px'
                          aria-label='Download album'
                          icon={<Download />}
                          onClick={(e) => handleSubmit(e, album._id, album.type, album.album_name, album.track_name)}
                        />

                        <IconButton
                          variant='link'
                          height='32px'
                          aria-label='Add to playlist'
                          icon={<PlaylistAdd />}
                          onClick={() => addToPlaylist(album._id, album.type)}
                        />

                      </Flex>
                    ))
                  ) : (
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
              <TabPanel>
                order history
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
    </>
  );
};

/*
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

*/

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
