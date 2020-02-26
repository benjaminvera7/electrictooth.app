import React, { Fragment } from 'react';
import {
  Box,
  Image,
  Flex,
  Text,
  Button,
  Stack,
  Heading,
} from '@chakra-ui/core';
import { Play, Close, Remove, Pause } from 'components/Icons';
import { connect } from 'react-redux';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const PlaylistCard = styled(Flex)`
  ${FADE_IN}
`;

const MobilePlaylistPanel = (props) => {
  return (
    <Fragment>
      <Flex
        bg='#18181b'
        style={{
          position: 'fixed',
          bottom: 0,
          borderTop: '1px solid var(--color-600)',
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
          <Heading px={2} py={2} as='h2' size='2xl' color='#e2f4ff'>
            playlist
          </Heading>
          {props.playlist ? (
            <Fragment>
              {props.playlist.map((song) => (
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
                    {props.currentlyPlaying === song.id ? (
                      <Button
                        variant='link'
                        onClick={props.handlePlay}
                        isLoading={props.loading}
                      >
                        {props.playing ? <Pause /> : <Play />}
                      </Button>
                    ) : (
                      <Button
                        variant='link'
                        onClick={() => props.fetch(song.id)}
                      >
                        <Play />
                      </Button>
                    )}
                    <Button
                      variant='link'
                      onClick={() => props.remove(song.id)}
                    >
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
}))(MobilePlaylistPanel);
