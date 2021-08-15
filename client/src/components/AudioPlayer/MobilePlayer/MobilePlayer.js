import React, { Fragment } from 'react';
import { Playlist, ArrowDown, Next, Previous, Play, Pause, Toll } from 'components/Icons';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import theme from 'theme.js';

const Panel = styled(Box)`
  background: linear-gradient(180deg, #324148 50%, #000000 100%)
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
    <Fragment>
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
    </Fragment>
  );
};

export default connect((state) => ({
  playlist: state.user.playlist,
  updatedAt: state.user.updatedAt,
}))(MobilePlayer);
