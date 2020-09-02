import React, { Fragment } from 'react';
import { Box, Image, Flex, Text, Stack, Heading, Button } from '@chakra-ui/core';
import { Play, Close, Remove, Pause } from 'components/Icons';
import { connect } from 'react-redux';
import theme from 'theme.js';
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
        bg='#fff'
        style={{
          position: 'fixed',
          borderBottom: `1px solid ${theme.colors.etGreen}`,
        }}
        w='500px'
        align='center'
        h='40px'
      >
        <Box onClick={() => toggle(false)} px={2}>
          <Close />
        </Box>

        <Heading
          px={2}
          as='h2'
          size='sm'
          color={`${theme.colors.etGreen}`}
          style={{
            position: 'absolute',
            right: '8px',
            opacity: '0.5',
          }}
        >
          playlist
        </Heading>
      </Flex>

      <Box mt='48px' mb='16px'>
        <Stack spacing={2}>
          {playlist ? (
            <Fragment>
              {playlist.map((song) => (
                <PlaylistCard w='100%' key={song.id} p={2}>
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

                  <Flex direction='column' pl={2} justify='center'>
                    <Text color='gray.600' fontSize='sm'>
                      {song.artist_name}
                    </Text>
                    <Text color='gray.500' fontSize='sm'>
                      {song.song_name}
                    </Text>
                  </Flex>

                  <Box mx='auto' />

                  <Flex align='center' minWidth='100px' justify='space-evenly'>
                    {currentlyPlaying === song.id ? (
                      <Button variant='link' onClick={handlePlay} isLoading={loading}>
                        {playing ? <Pause /> : <Play />}
                      </Button>
                    ) : (
                      <Button variant='link' onClick={() => fetch(song.id)}>
                        <Play />
                      </Button>
                    )}
                    <Button variant='link' onClick={() => remove(song.product_id)}>
                      <Remove />
                    </Button>
                  </Flex>
                </PlaylistCard>
              ))}
            </Fragment>
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
}))(DesktopPlaylistPanel);
