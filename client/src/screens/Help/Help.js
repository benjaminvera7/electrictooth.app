import React from 'react';
import { Box, Flex, Text, Heading, List, ListItem, ListIcon } from '@chakra-ui/core';

import { Toll, Star } from 'components/Icons';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import theme from 'theme.js';

const HelpContainer = styled(Flex)`
  ${FADE_IN}
`;

const Help = () => {
  return (
    <HelpContainer justify='center'>
      <Box color='white' maxW='1440px' flex='1'>
        <Heading px={4} pt={2} as='h2' size='2xl' color={theme.colors.etGreen}>
          help
        </Heading>

        <Text px={4} fontSize='sm' mb={4} color='grey'>
          Electric Tooth, an indie streaming service.
        </Text>

        {/* <Flex px={4} pb={2}>
          (mission statement)
        </Flex> */}

        <Box px={4}>
          <Heading pt={2} pb={2} as='h2' size='md' color='gray.600'>
            Getting started:
          </Heading>

          <List spacing={3} px={2}>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              <ListIcon icon='add' color='blue.300' />
              Create an account.
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              <Flex align='center'>
                <Box pr={1}>
                  <Toll height='22px' width='22px' />
                </Box>
                <Text fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
                  1 coin = $0.01 USD = 1 stream.
                </Text>
              </Flex>
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              <ListIcon icon='plus-square' color='teal.300' />
              Add and Save an album or song to your Playlist.
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              <ListIcon icon='info' color='yellow.300' />
              As long as you have coins, you can stream any unpurchased album or song.
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              <ListIcon icon='download' color='purple.300' />
              If you purchase an album or song, you can view and download it in your Profile.
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              <ListIcon icon='check-circle' color='green.300' />
              If you purchase an album or song, streaming it no longer uses a coin.
            </ListItem>
          </List>
        </Box>

        <Box px={4}>
          <Heading pt={8} pb={2} as='h2' size='md' color='gray.600'>
            Notes:
          </Heading>

          <Flex align='center' pb={3}>
            <Box px={2}>
              <Toll height='22px' width='22px' />
            </Box>
            <Text fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              1 coin = $0.01 USD = 1 stream.
            </Text>
          </Flex>

          <Flex align='center' pb={3}>
            <Box px={2} fontSize={['xs', 'sm', 'md', 'lg']}>
              <ListIcon icon='arrow-down' color='green.300' />
            </Box>
            <Text fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              100% of digital download and streaming revenue goes to the artist!
            </Text>
          </Flex>

          <Flex align='center' pb={3}>
            <Box px={2}>
              <Star height='26px' width='26px' />
            </Box>
            <Text fontSize={['xs', 'sm', 'md', 'lg']} color='gray.500'>
              Coded by{' '}
              <a href='https://twitter.com/princebiomass' style={{ color: '#0FF4C6', textDecoration: 'underline' }}>
                Ben.
              </a>
            </Text>
          </Flex>
        </Box>
      </Box>
    </HelpContainer>
  );
};

export default Help;
