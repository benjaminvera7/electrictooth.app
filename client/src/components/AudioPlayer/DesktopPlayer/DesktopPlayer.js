import React, { useRef, useState, useEffect } from 'react';
import { Box, Text, Flex, Image, Button } from '@chakra-ui/react';
import { Playlist, Previous, Next, Play, Pause, Toll } from 'components/Icons';
import DesktopPlaylistPanel from '../DesktopPlaylistPanel';
import theme from 'theme.js';
import styled from '@emotion/styled';
//import useEventListener from 'hooks/useEventListener';


const DesktopPlayerContainer = styled(Flex)`
  position: fixed;
  display: flex;
  bottom: 0px;
  z-index: 2;
  background-color: var(--et-gray);
  color: var(--et-gray);
  height: 90px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 16px 0 16px;
  transform: ${props => props.isLoading ? 'translateY(160px)' : 'translateY(0)'};
  transition-delay: ${props => props.isLoading ? '0ms' : '350ms'};
  transition: transform 200ms ease-out;
`;

const NotificationDot = styled(Box)`
  position: absolute;
  color: var(--et-violet);  
  top: -24px;
  right: -9px;
  font-size: 26px;
  font-weight: bold;
`;

const DesktopPlayer = ({
  handlePlay,
  handleNext,
  handlePrevious,
  playing,
  progressBar,
  remove,
  fetch,
  currentlyPlaying,
  coins,
  playlist,
  loading,
}) => {
  const [visible, setVisibility] = useState(false);
  const playButton = useRef(null);
  const [isLoading, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 250);
  }, []);

  // const handlePlaySpace = e => {
  //   playButton.current.focus();
  //   if (e.keyCode == 32 && !playing) {

  //     handlePlay();
  //   } else {
  //     handlePlay();
  //   }
  // }

  // useEventListener('keydown', handlePlaySpace)


  return (
    <>
      <DesktopPlayerContainer isLoading={isLoading}>
        <Flex maxW='1100px' flex='1' height='60px'>

          <Flex flex='1' align='center' minWidth='275px'>
            <Image
              src={`/uploads/${currentlyPlaying.art_name}`}
              h='74px'
              w='74px'
              fallbackSrc="/sonic.gif"
            />

            <Flex direction='column' pl={4}>
              <Text color='gray.600' fontSize='sm' color='white' style={{ fontFamily: 'Spotify-Bold' }}>
                {currentlyPlaying.artist_name}
              </Text>
              <Text color='gray.500' fontSize='sm' color='white'  >
                {currentlyPlaying.track_name}
              </Text>
            </Flex>
          </Flex>


          <Flex flex='2' direction='column' justify='center' align='center'>
            <Box pb={3}>
              <Button variant='link' onClick={handlePrevious}>
                <Previous />
              </Button>
              <Button variant='link' onClick={handlePlay} isLoading={loading} name="play" ref={playButton}>
                {playing ? <Pause /> : <Play />}
              </Button>
              <Button variant='link' onClick={handleNext}>
                <Next />
              </Button>
            </Box>

            <Flex justify='center'>{progressBar}</Flex>
          </Flex>
          <Flex flex='1' justify='space-evenly'>
            <Flex align='center' color={`${theme.colors.etGreen}`}>
              <Box>
                <Toll height='26px' width='26px' />
              </Box>
              <Box minWidth='50px' px={2} color={`${theme.colors.etBlue}`}>
                {coins}
              </Box>
            </Flex>

            <Button variant='link' onClick={() => {
              setVisibility(!visible)
            }}>
              <Box style={{ position: 'relative' }}>
                <Playlist active={visible} />
                <NotificationDot>
                  {playlist?.length === 0 ? '' : '•'}
                </NotificationDot>
              </Box>
            </Button>
          </Flex>
        </Flex>
      </DesktopPlayerContainer>

      <DesktopPlaylistPanel
        isVisible={visible}
        toggle={setVisibility}
        playing={playing}
        remove={remove}
        fetch={fetch}
        currentlyPlaying={currentlyPlaying}
        handlePlay={handlePlay}
        loading={loading}
        playlist={playlist}
      />
    </>
  );
};

export default DesktopPlayer;