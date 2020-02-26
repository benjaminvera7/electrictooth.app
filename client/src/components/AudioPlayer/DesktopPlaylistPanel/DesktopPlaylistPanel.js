import React, { Fragment } from 'react';
import {
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Heading,
  Button,
} from '@chakra-ui/core';
import { Play, Close, Remove, Pause } from 'components/Icons';
import { connect } from 'react-redux';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const PlaylistCard = styled(Flex)`
  ${FADE_IN}
`;

const DesktopPlaylistPanel = ({
  toggle,
  playlist,
  playing,
  remove,
  currentlyPlaying,
  handlePlay,
  fetch,
  loading,
  user,
}) => {
  return (
    <Fragment>
      <Flex
        p={2}
        bg='#18181b'
        style={{
          position: 'fixed',
          borderBottom: '1px solid var(--color-600)',
        }}
        w='500px'
        align='center'
        h='40px'
      >
        <Box onClick={() => toggle(false)} px={2}>
          <Close />
        </Box>
      </Flex>

      <Box mt='48px' mb='16px'>
        <Stack spacing={2}>
          <Heading px={2} pb={2} as='h2' size='xl' color='#e2f4ff'>
            playlist
          </Heading>
          {playlist ? (
            <Fragment>
              {playlist.map((song) => (
                <PlaylistCard w='100%' key={song.id} p={2}>
                  <Box>
                    <Image
                      src={`/uploads/${song.art_url}`}
                      maxWidth='80px'
                      px={2}
                      borderRadius='50%'
                    />
                  </Box>

                  <Flex direction='column' pl={2}>
                    <Text color='white'>{song.artist_name}</Text>
                    <Text color='gray.500'>{song.song_name}</Text>
                  </Flex>

                  <Box mx='auto' />

                  <Flex align='center' minWidth='100px' justify='space-evenly'>
                    {currentlyPlaying === song.id ? (
                      <Button
                        variant='link'
                        onClick={handlePlay}
                        isLoading={loading}
                      >
                        {playing ? <Pause /> : <Play />}
                      </Button>
                    ) : (
                      <Button variant='link' onClick={() => fetch(song.id)}>
                        <Play />
                      </Button>
                    )}
                    <Button variant='link' onClick={() => remove(song.id)}>
                      <Remove />
                    </Button>
                  </Flex>
                </PlaylistCard>
              ))}
            </Fragment>
          ) : (
            undefined
          )}
        </Stack>
      </Box>
    </Fragment>
  );
};

export default connect((state) => ({
  playlist: state.user.playlist,
  user: state.user,
  updatedAt: state.user.updatedAt,
}))(DesktopPlaylistPanel);
