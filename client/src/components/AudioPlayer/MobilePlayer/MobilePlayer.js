import React, { Fragment } from 'react';
import { Playlist, ArrowDown, Next, Previous, Play, Pause, Toll, ChevronDown } from 'components/Icons';
import { Box, Flex, Image, Text, Button, Stack } from '@chakra-ui/react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import theme from 'theme.js';

const Panel = styled(Flex)`
  background: linear-gradient(180deg, #324148 50%, #000000 100%);
  min-height: 100vh;
  justify-content: center;
`;

const MobilePlayer = ({
  playing,
  handlePlay,
  handleNext,
  handlePrevious,
  progressBar,
  track,
  playlist,
  coins,
  playlistVisible,
  setPlaylistVisibility,
  playerVisible,
  setPlayerVisibility,
  loading,
}) => {
  return (
    <Panel>
      <Stack pt={2} width='300px'>

        <Box ml="-12px" w='300px'>
          <Button
            variant='link'
            onClick={() => setPlayerVisibility(!playerVisible)}
            style={{ minHeight: '44px' }}
          >
            <ChevronDown />
          </Button>
        </Box>

        <Flex pb="28px">
          {track.length > 0
            ? <Image
              src={`/uploads/${track[0].art_name}`}
              h='300px'
              w='300px'
              border="2px solid #89DBFF"
              borderRadius="20px"
              backgroundColor={`${theme.colors.etBlack}`}
              boxShadow='8px 8px 0 #89DBFF'
            />
            : <Box h='300px' w='300px' backgroundColor={`${theme.colors.etGreen}`} />
          }
        </Flex>

        <Flex direction='column' pb="18px">
          <Text fontSize='24px' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
            {track.length > 0 ? `${track[0].track_name}` : undefined}
          </Text>
          <Text fontSize='18px' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {track.length > 0 ? `${track[0].artist_name}` : `~`}
          </Text>
        </Flex>

        <Flex direction='column' align='center' w='100%'>
          {progressBar}
        </Flex>

        <Flex justify='space-evenly' align='center' py={8}>
          <Box>
            <Button variant='link' onClick={handlePrevious}>
              <Previous />
            </Button>
          </Box>
          <Box>
            <Button variant='link' onClick={handlePlay} isLoading={loading}>
              {playing ? <Pause /> : <Play />}
            </Button>
          </Box>
          <Box>
            <Button variant='link' onClick={handleNext}>
              <Next />
            </Button>
          </Box>
        </Flex>


      </Stack>
    </Panel>
  );
};

/*
      <Box py={2} ml="-12px" w='345px' alignSelf='center'>
        <Button
          variant='link'
          onClick={() => setPlayerVisibility(!playerVisible)}
          style={{ minHeight: '44px' }}
        >
          <ChevronDown />
        </Button>
      </Box>

      <Flex
        justifyContent='center'
        pb="40px"
      >
        {track.length > 0
          ? <Image
            src={`/uploads/${track[0].art_name}`}
            h='345px'
            w='345px'
            border="2px solid #89DBFF"
            borderRadius="20px"
            backgroundColor={`${theme.colors.etBlack}`}
            boxShadow='8px 8px 0 #89DBFF'
          />
          : <Box h='345px' w='345px' backgroundColor={`${theme.colors.etGreen}`} />
        }
      </Flex>

      <Flex width='100%' justifyContent='flex-start'>
        <Flex direction='column' pb={2} minWidth='345px' border='1px solid red'>
          <Text fontSize='24px' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
            {track.length > 0 ? `${track[0].artist_name}` : `~`}
          </Text>
          <Text fontSize='18px' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {track.length > 0 ? `${track[0].track_name}` : undefined}
          </Text>
        </Flex>

      </Flex>



*/

/*
      <Box mt={-1}>
        {track.length > 0
          ? <Image src={`/uploads/${track[0].art_name}`} w='100%' />
          : <Box w='100%' height='500px' backgroundColor={`${theme.colors.etGreen}`} />
        }
      </Box>

      <Flex direction='column' flex={2} align='center' p={2} backgroundColor={`${theme.colors.etBlack}`}>
        <Flex direction='column' align='center' pb={2}>
          <Text color='gray.600' fontSize='sm' style={{ fontFamily: 'Spotify-Bold' }} color='white'>
            {track.length > 0 ? `${track[0].artist_name}` : `~`}
          </Text>
          <Text color='gray.500' fontSize='sm' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {track.length > 0 ? `${track[0].track_name}` : undefined}
          </Text>
        </Flex>

        <Flex direction='column' align='center' w='100%'>
          {progressBar}
        </Flex>

        <Flex justify='space-evenly' align='center' w='100%' flex='1 1 auto' minHeight='50px'>
          <Button variant='link' onClick={handlePrevious}>
            <Previous />
          </Button>

          <Button variant='link' onClick={handlePlay} isLoading={loading}>
            {playing ? <Pause /> : <Play />}
          </Button>

          <Button variant='link' onClick={handleNext}>
            <Next />
          </Button>
        </Flex>
      </Flex>

      <Flex
        h='50px'
        bg='#fff'
        style={{
          borderTop: `1px solid ${theme.colors.etGreen}`,
          padding: '0 8px 0 6px',
        }}
        w='100%'
        backgroundColor={`${theme.colors.etBlack}`}
      >
        <Button variant='link' onClick={() => setPlayerVisibility(!playerVisible)} style={{ minHeight: '44px' }}>
          <ArrowDown />
        </Button>

        <Box mx='auto' />

        <Flex align='center' color={`${theme.colors.etGreen}`}>
          <Box px={2}>
            <Toll height='26px' width='26px' />
          </Box>
          {coins}
        </Flex>

        <Box mx='auto' />

        <Button variant='link' onClick={() => setPlaylistVisibility(!playlistVisible)} style={{ minHeight: '44px' }}>
          <Box style={{ position: 'relative' }}>
            <Playlist />
            <Box
              style={{
                position: 'absolute',
                color: `${theme.colors.etGreen}`,
                top: '-9px',
                right: '-6px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {playlist.length === 0 ? '' : '•'}
            </Box>
          </Box>
        </Button>
      </Flex>
*/

export default connect((state) => ({
  playlist: state.user.playlist,
  updatedAt: state.user.updatedAt,
}))(MobilePlayer);
