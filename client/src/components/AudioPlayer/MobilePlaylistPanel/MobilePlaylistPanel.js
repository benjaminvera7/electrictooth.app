import React, { Fragment } from 'react';
import { Box, Image, Flex, Text, Button, Stack, Heading } from '@chakra-ui/react';
import { Play, ChevronDown, Remove, Pause } from 'components/Icons';
import { connect } from 'react-redux';
import theme from 'theme.js';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const PlaylistCard = styled(Flex)`
  ${FADE_IN}
`;

const Panel = styled(Box)`
  background: linear-gradient(180deg, #324148 50%, #000000 100%)
`;

const MobilePlaylistPanel = (props) => {
  return (
    <Panel>
      <Box minHeight='100vh'>
        <Stack pt={2}>

          <Box px={2}>
            <Button
              variant='link'
              onClick={() => props.setPlaylistVisibility(!props.playlistVisible)}
              style={{ minHeight: '44px' }}
            >
              <ChevronDown />
            </Button>
          </Box>

          <Box px={4} color='white' fontFamily='Spotify-Bold' fontSize='24px' pb={2}>Playlist</Box>

          {props.playlist ? (
            <Box>
              {props.playlist.map((track) => (
                <PlaylistCard w='100%' key={track._id} p={2} borderRadius='6px'>
                  <Box px={2}>
                    <Image
                      src={`/uploads/${track.art_name}`}
                      h='48px'
                      w='48px'
                    />
                  </Box>

                  <Flex direction='column' justify='center'>
                    <Text color='white' fontSize='sm' fontFamily='Spotify-Bold'>
                      {track.track_name}
                    </Text>
                    <Text color='white' fontSize='sm' fontFamily='Spotify-Light'>
                      {track.artist_name}
                    </Text>
                  </Flex>

                  <Box mx='auto' />

                  <Flex align='center' minWidth='100px' justify='space-evenly'>
                    {props.currentlyPlaying === track._id ? (
                      <Button variant='link' onClick={props.handlePlay} isLoading={props.loading}>
                        {props.playing ? <Pause /> : <Play />}
                      </Button>
                    ) : (
                      <Button variant='link' onClick={() => props.fetch(track._id)}>
                        <Play />
                      </Button>
                    )}
                    <Button variant='link' onClick={() => props.remove(track._id)}>
                      <Remove />
                    </Button>
                  </Flex>
                </PlaylistCard>
              ))}
            </Box>
          ) : undefined}
        </Stack>
      </Box>
    </Panel>
  );
};

export default connect((state) => ({
  playlist: state.user.playlist,
  user: state.user,
  updatedAt: state.user.updatedAt,
}))(MobilePlaylistPanel);
