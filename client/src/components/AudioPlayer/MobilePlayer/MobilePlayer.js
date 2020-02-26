import React, { Fragment } from 'react';
import {
  Playlist,
  ArrowDown,
  Next,
  Previous,
  Play,
  Pause,
  Toll,
} from 'components/Icons';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/core';

import { connect } from 'react-redux';

const MobilePlayer = ({
  playing,
  handlePlay,
  handleNext,
  handlePrevious,
  progressBar,
  song,
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
        <Image
          src={
            song.length > 0
              ? `/uploads/${song[0].art_url}`
              : `https://via.placeholder.com/80`
          }
          w='100%'
        />
      </Box>

      <Flex direction='column' flex={2} align='center' p={2}>
        <Flex direction='column' align='center' pb={2}>
          <Text>{song.length > 0 ? `${song[0].artist_name}` : `~`}</Text>
          <Text color='gray.500'>
            {song.length > 0 ? `${song[0].song_name}` : undefined}
          </Text>
        </Flex>

        <Flex direction='column' align='center' w='100%'>
          {progressBar}
        </Flex>

        <Flex
          justify='space-evenly'
          align='center'
          w='100%'
          flex='1 1 auto'
          minHeight='50px'
        >
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
        bg='#18181b'
        style={{
          borderTop: '1px solid var(--color-600)',
          padding: '0 8px 0 6px',
        }}
        w='100%'
      >
        <Button
          variant='link'
          onClick={() => setPlayerVisibility(!playerVisible)}
          style={{ minHeight: '44px' }}
        >
          <ArrowDown />
        </Button>

        <Box mx='auto' />

        <Flex align='center'>
          <Box px={2}>
            <Toll height='26px' width='26px' />
          </Box>
          {coins}
        </Flex>

        <Box mx='auto' />

        <Button
          variant='link'
          onClick={() => setPlaylistVisibility(!playlistVisible)}
          style={{ minHeight: '44px' }}
        >
          <Box style={{ position: 'relative' }}>
            <Playlist />
            <Box
              style={{
                position: 'absolute',
                color: 'yellow',
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
