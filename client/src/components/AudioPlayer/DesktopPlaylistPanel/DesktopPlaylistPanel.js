import React from 'react';
import { Box, Image, Flex, Text, Stack, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

const DesktopPlaylistPanelContainer = styled(Box)`
  background: linear-gradient(180deg, #324148 50%, #000000 100%);
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(100vh)'};
  transition: transform 200ms ease-out;
  padding: 0 32px;
  min-height: 500px;
  position: fixed;
  display: flex;
  height: 500px;
  width: 500px;
  right: 8px;
  bottom: 88px;
  flex-direction: column;
  overflow-y: scroll;
`;

const Remove = () => (
  <Flex h='48px' alignItems='center'>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 15.3334C12.0501 15.3334 15.3333 12.0501 15.3333 8.00002C15.3333 3.94993 12.0501 0.666687 8 0.666687C3.94992 0.666687 0.666672 3.94993 0.666672 8.00002C0.666672 12.0501 3.94992 15.3334 8 15.3334Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4 8H12" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </Flex>
);

const Play = () => (
  <Flex h='48px' alignItems='center'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='white'
      viewBox='0 0 24 24'
    >
      <path d='M8 5v14l11-7z' />
    </svg>
  </Flex>
)

const Pause = () => (
  <Flex h='48px' alignItems='center'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='white'
      viewBox='0 0 24 24'
    >
      <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
    </svg>
  </Flex>
)

const ChevronDown = () => (
  <Flex h='48px' alignItems='center'>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.833328 7.5L9.99999 14.1667L19.1667 7.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </Flex>
)

const DesktopPlaylistPanel = ({
  toggle,
  playing,
  remove,
  currentlyPlaying,
  handlePlay,
  fetch,
  loading,
  isVisible,
  playlist = []
}) => {

  console.log()

  return (
    <DesktopPlaylistPanelContainer isVisible={isVisible}>

      <Flex h='100px' alignItems='center'>
        <Flex h='100px' alignItems='center' flex='2' w='48px' >
          <Button onClick={() => toggle(false)} variant='link'>
            <ChevronDown />
          </Button>
        </Flex>

        <Box fontFamily='Spotify-Bold' fontSize='28px' color='white'>
          Playlist
        </Box>
      </Flex>

      <Stack>
        {playlist.map((track) => (
          <Flex alignItems='center' key={track._id}>
            <Box width="48px" height="48px" overflow='hidden' position='relative' >
              <Image src={`/uploads/${track.art_name}`} h='100%' w='100%' objectFit='cover' alt={`${track.track_name} artwork`} />
            </Box>
            <Flex pl={4} flexDirection="column" justifyContent='center' flex='2'>
              <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='180px' isTruncated>
                {`${track.track_name}`}
              </Text>
              <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
                {track.artist_name}
              </Text>
            </Flex>
            <Flex w='48px' h='48px' justifyContent='center' alignItems='center'>


              {currentlyPlaying._id === track._id ? (
                <Button variant='link' onClick={handlePlay} isLoading={loading}>
                  {playing ? <Pause /> : <Play />}
                </Button>
              ) : (
                <Button variant='link' onClick={() => fetch(track._id)}>
                  <Play />
                </Button>
              )}
            </Flex>
            <Flex w='48px' h='48px' justifyContent='center' alignItems='center'>
              <Button variant='link' onClick={() => remove(track._id)}>
                <Remove />
              </Button>
            </Flex>
          </Flex>
        ))
        }
      </Stack>
    </DesktopPlaylistPanelContainer>
  );
};

export default DesktopPlaylistPanel;
