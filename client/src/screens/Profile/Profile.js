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

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const ProfileCard = styled(Box)`
  ${FADE_IN}
`;

const Profile = ({ UserActions, user, history, albumCollection }) => {
  return (
    <Flex justify='center'>
      <ProfileCard color='white' maxW='1100px' flex='1'>
        <Flex justify='space-between'>
          <Heading px={4} py={2} as='h2' size='2xl' color='#0FF4C6'>
            {user.username}
          </Heading>

          <Heading px={4} py={5} as='h2' size='md' color='#0FF4C6'>
            <Flex align='center'>
              <Box px={2}>
                <Toll height='26px' width='26px' />
              </Box>
              {user.coins}
            </Flex>
          </Heading>
        </Flex>

        <Tabs isFitted color='white' mx={1}>
          <TabList mb='1em'>
            <Tab>Collection</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanels mx={1}>
            <TabPanel>
              <Stack m={2}>
                {albumCollection.map((album, i) => (
                  <Flex py={2} borderWidth='1px' rounded='lg' key={i}>
                    <Box>
                      <Link to={`/catalog/${album.id}`}>
                        <Image
                          src={`${album.art_url}`}
                          maxWidth='108px'
                          px={2}
                        />
                      </Link>
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
                        icon={Download}
                        mb={2}
                      />
                      <IconButton
                        variant='solid'
                        variantColor='teal'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={PlaylistAdd}
                      />
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Flex justify='flex-end'>
                <Button
                  size='sm'
                  variant='solid'
                  bg='#4794d2'
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
  );
};

export default connect(
  (state) => ({
    user: state.user,
    albumCollection: state.user.albumCollection,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(requireAuth(Profile));
