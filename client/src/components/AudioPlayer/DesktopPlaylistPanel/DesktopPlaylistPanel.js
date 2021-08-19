import React, { Fragment } from 'react';
import { Box, Image, Flex, Text, Stack, Heading, Button } from '@chakra-ui/react';
import { Pause } from 'components/Icons';
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

const ChevronDown = () => (
  <Flex h='48px' alignItems='center'>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.833328 7.5L9.99999 14.1667L19.1667 7.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </Flex>
)

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
    <Panel minHeight='500px' px={8}>

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
        {playlist.length > 0
          ? playlist.map((track) => (
            <Flex alignItems='center'>
              <Box width="48px" height="48px" overflow='hidden' position='relative' >
                <Image src={`/uploads/${track.art_name}`} h='100%' w='100%' objectFit='cover' />
              </Box>
              <Flex pl={4} flexDirection="column" justifyContent='center' flex='2'>
                <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='180px' isTruncated>
                  {`${track.track_name} (MP3)`}
                </Text>
                <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
                  {track.artist_name}
                </Text>
              </Flex>
              <Flex w='48px' h='48px' justifyContent='center' alignItems='center'>
                {currentlyPlaying === track._id ? (
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
          : undefined
        }
      </Stack>
    </Panel>
  );
};

export default connect((state) => ({
  playlist: state.user.playlist,
  user: state.user,
  updatedAt: state.user.updatedAt,
}))(DesktopPlaylistPanel);

/*
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
          <ChevronDown />
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
          {playlist.length > 0 ? (
            <Fragment>
              {playlist.map((track) => (
                <PlaylistCard w='100%' key={track._id} p={2}>
                  <Box px={2}>
                    <Image
                      src={`/uploads/${track.art_name}`}
                      h='48px'
                      w='48px'
                      borderRadius='50%'
                      border='1px'
                      borderColor={`${theme.colors.etGreen}`}
                    />
                  </Box>

                  <Flex direction='column' pl={2} justify='center'>
                    <Text color='gray.600' fontSize='sm'>
                      {track.artist_name}
                    </Text>
                    <Text color='gray.500' fontSize='sm'>
                      {track.track_name}
                    </Text>
                  </Flex>

                  <Box mx='auto' />

                  <Flex align='center' minWidth='100px' justify='space-evenly'>
                    {currentlyPlaying === track._id ? (
                      <Button variant='link' onClick={handlePlay} isLoading={loading}>
                        {playing ? <Pause /> : <Play />}
                      </Button>
                    ) : (
                      <Button variant='link' onClick={() => fetch(track._id)}>
                        <Play />
                      </Button>
                    )}
                    <Button variant='link' onClick={() => remove(track._id)}>
                      <Remove />
                    </Button>
                  </Flex>
                </PlaylistCard>
              ))}
            </Fragment>
          ) : undefined}
        </Stack>
      </Box>
*/