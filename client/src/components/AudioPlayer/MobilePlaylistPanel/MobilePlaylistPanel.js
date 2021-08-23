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

const MobilePlaylistPanelContainer = styled(Flex)`
  background: linear-gradient(180deg, #324148 50%, #000000 100%);
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(100vh)'};
  transition: transform 200ms ease-out;
  position: fixed;
  z-index: 5;
  background-color: #fff;
  height: 100vh;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 55px;
`;

const MobilePlaylistPanel = (props) => {
  return (
    <MobilePlaylistPanelContainer isVisible={props.playlistVisible}>
      <Box minHeight='100vh'>
        <Stack pt={2}>

          <Flex h='48px' alignItems='center' p={2}>
            <Button
              variant='link'
              onClick={() => props.setPlaylistVisibility(!props.playlistVisible)}
              style={{ minHeight: '44px' }}
            >
              <ChevronDown />
            </Button>
          </Flex>

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
                    <Text color='white' fontSize='sm' fontFamily='Spotify-Bold' maxWidth='180px' isTruncated>
                      {track.track_name}
                    </Text>
                    <Text color='white' fontSize='sm' fontFamily='Spotify-Light'>
                      {track.artist_name}
                    </Text>
                  </Flex>

                  <Box mx='auto' />

                  <Flex align='center' minWidth='100px' justify='space-evenly'>
                    {props.currentlyPlaying._id === track._id ? (
                      <Button variant='link' onClick={props.handlePlay} isLoading={props.loading}>
                        <Flex h='48px' alignItems='center' justifyContent='center'>
                          {props.playing ? <Pause /> : <Play />}
                        </Flex>
                      </Button>
                    ) : (
                      <Button variant='link' onClick={() => props.fetch(track._id)}>
                        <Flex h='48px' alignItems='center' justifyContent='center'>
                          <Play />
                        </Flex>
                      </Button>
                    )}
                    <Button variant='link' onClick={() => props.remove(track._id)}>
                      <Flex h='48px' alignItems='center' justifyContent='center'>
                        <Remove />
                      </Flex>
                    </Button>
                  </Flex>
                </PlaylistCard>
              ))}
            </Box>
          ) : undefined}
        </Stack>
      </Box>
    </MobilePlaylistPanelContainer>
  );
};

export default connect((state) => ({
  playlist: state.user.playlist,
  user: state.user,
  updatedAt: state.user.updatedAt,
}))(MobilePlaylistPanel);
