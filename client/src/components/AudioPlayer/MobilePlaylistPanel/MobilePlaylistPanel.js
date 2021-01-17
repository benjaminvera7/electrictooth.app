import React, { Fragment } from 'react';
import { Box, Image, Flex, Text, Button, Stack, Heading } from '@chakra-ui/core';
import { Play, Close, Remove, Pause } from 'components/Icons';
import { connect } from 'react-redux';
import theme from 'theme.js';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const PlaylistCard = styled(Flex)`
  ${FADE_IN}
`;

const MobilePlaylistPanel = (props) => {
  return (
    <Fragment>
      <Flex
        bg='#fff'
        style={{
          position: 'fixed',
          bottom: 0,
          borderTop: `1px solid ${theme.colors.etGreen}`,
        }}
        w='100%'
        h='50px'
        align='center'
        justify='flex-end'
        pr='10px'
      >
        <Button
          variant='link'
          onClick={() => props.setPlaylistVisibility(!props.playlistVisible)}
          style={{ minHeight: '44px' }}
        >
          <Close />
        </Button>
      </Flex>

      <Box>
        <Stack pt={2}>
          <Heading
            px={2}
            py={2}
            as='h2'
            size='md'
            color={`${theme.colors.etGreen}`}
            style={{
              position: 'absolute',
              right: '8px',
              opacity: '0.5',
            }}
          >
            playlist
          </Heading>
          {props.playlist ? (
            <Box pt='50px'>
              {props.playlist.map((song) => (
                <PlaylistCard w='100%' key={song.id} p={2} borderRadius='6px'>
                  <Box px={2}>
                    <Image
                      src={`/uploads/${song.img_url}`}
                      h='48px'
                      w='48px'
                      borderRadius='50%'
                      border='1px'
                      borderColor={`${theme.colors.etGreen}`}
                    />
                  </Box>

                  <Flex direction='column' justify='center'>
                    <Text color='gray.600' fontSize='sm'>
                      {song.artist_name}
                    </Text>
                    <Text color='gray.500' fontSize='sm'>
                      {song.song_name}
                    </Text>
                  </Flex>

                  <Box mx='auto' />

                  <Flex align='center' minWidth='100px' justify='space-evenly'>
                    {props.currentlyPlaying === song.id ? (
                      <Button variant='link' onClick={props.handlePlay} isLoading={props.loading}>
                        {props.playing ? <Pause /> : <Play />}
                      </Button>
                    ) : (
                      <Button variant='link' onClick={() => props.fetch(song.id)}>
                        <Play />
                      </Button>
                    )}
                    <Button variant='link' onClick={() => props.remove(song._id)}>
                      <Remove />
                    </Button>
                  </Flex>
                </PlaylistCard>
              ))}
            </Box>
          ) : undefined}
        </Stack>
      </Box>
    </Fragment>
  );
};

export default connect((state) => ({
  playlist: state.user.playlist,
  user: state.user,
  updatedAt: state.user.updatedAt,
}))(MobilePlaylistPanel);
