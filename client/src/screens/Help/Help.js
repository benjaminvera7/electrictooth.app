import React from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/core';

import { Toll, Download, Star } from 'components/Icons';

const Help = () => {
  return (
    <Flex justify='center'>
      <Box color='white' maxW='1100px' flex='1'>
        <Heading px={4} pt={2} as='h2' size='2xl'>
          help
        </Heading>

        <Text px={4} fontSize='sm' mb={4} color='grey'>
          Electric Tooth, an indie streaming service.
        </Text>

        <Flex px={4} pb={2}>
          (mission statement)
        </Flex>

        <Box px={4}>
          <Heading pt={2} pb={2} as='h2' size='md'>
            Getting started:
          </Heading>

          <List spacing={3} px={2}>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']}>
              <ListIcon icon='add' color='blue.300' />
              Create an account.
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']}>
              <Flex align='center'>
                <Box pr={1}>
                  <Toll height='22px' width='22px' />
                </Box>
                <Text fontSize={['xs', 'sm', 'md', 'lg']}>
                  1 coin = $0.01 USD = 1 stream.
                </Text>
              </Flex>
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']}>
              <ListIcon icon='plus-square' color='teal.300' />
              Add and Save an album or song to your Playlist.
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']}>
              <ListIcon icon='info' color='yellow.300' />
              As long as you have coins, you can stream any unpurchased album or
              song.
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']}>
              <ListIcon icon='download' color='purple.300' />
              If you purchase an album, you can view and download it in your
              Profile.
            </ListItem>
            <ListItem fontSize={['xs', 'sm', 'md', 'lg']}>
              <ListIcon icon='check-circle' color='green.300' />
              If you purchase an album, streaming it no longer uses a coin.
            </ListItem>
          </List>
        </Box>

        <Box px={4}>
          <Heading pt={8} pb={2} as='h2' size='md'>
            Notes:
          </Heading>

          <Flex align='center' pb={3}>
            <Box px={2}>
              <Toll height='22px' width='22px' />
            </Box>
            <Text fontSize={['xs', 'sm', 'md', 'lg']}>
              1 coin = $0.01 USD = 1 stream.
            </Text>
          </Flex>

          <Flex align='center' pb={3}>
            <Box px={2}>
              <Download height='26px' width='26px' />
            </Box>
            <Text fontSize={['xs', 'sm', 'md', 'lg']}>
              100% of digital download and streaming revenue goes to the artist!
            </Text>
          </Flex>

          <Flex align='center' pb={3}>
            <Box px={2}>
              <Star height='26px' width='26px' />
            </Box>
            <Text fontSize={['xs', 'sm', 'md', 'lg']}>
              Coded by{' '}
              <a
                href='https://twitter.com/princebiomass'
                style={{ color: '#0FF4C6', textDecoration: 'underline' }}
              >
                Ben.
              </a>
            </Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Help;
