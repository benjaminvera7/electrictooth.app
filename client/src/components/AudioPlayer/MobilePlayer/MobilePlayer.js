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

export default connect((state) => ({
  playlist: state.user.playlist,
  updatedAt: state.user.updatedAt,
}))(MobilePlayer);
