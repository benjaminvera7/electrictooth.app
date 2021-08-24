import React from 'react';
import { Next, Previous, Play, Pause, ChevronDown } from 'components/Icons';
import { Box, Flex, Image, Text, Button, Stack } from '@chakra-ui/react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import theme from 'theme.js';


const MobilePlayerContainer = styled(Flex)`
  background: linear-gradient(180deg, #324148 50%, #000000 100%);
  min-height: 100vh;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(100vh)'};
  transition: transform 200ms ease-out;
  position: fixed;
  z-index: 4;
  width: 100vw;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  align-items: center;
`;

const MobilePlayer = ({
  playing,
  handlePlay,
  handleNext,
  handlePrevious,
  progressBar,
  currentlyPlaying,
  playerVisible,
  setPlayerVisibility,
  loading,
}) => {

  return (
    <MobilePlayerContainer isVisible={playerVisible}>
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
          <Image
            src={`/uploads/${currentlyPlaying.art_name}`}
            h='300px'
            w='300px'
            border="2px solid #89DBFF"
            borderRadius="20px"
            backgroundColor={`${theme.colors.etBlack}`}
            boxShadow='8px 8px 0 #89DBFF'
            fallbackSrc="/sonic.gif"
          />
        </Flex>

        <Flex direction='column' pb="18px">
          <Text fontSize='24px' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='300px' isTruncated>
            {currentlyPlaying.track_name}
          </Text>
          <Text fontSize='18px' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {currentlyPlaying.artist_name}
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
    </MobilePlayerContainer>
  );
};

export default connect((state) => ({
  playlist: state.user.playlist,
  updatedAt: state.user.updatedAt,
}))(MobilePlayer);
