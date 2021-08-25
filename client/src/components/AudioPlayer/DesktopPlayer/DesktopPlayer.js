import React, { useRef, useState, useEffect } from 'react';
import { Box, Text, Flex, Image, Button } from '@chakra-ui/react';
import { Playlist, Previous, Next, Play, Pause, Toll } from 'components/Icons';
import DesktopPlaylistPanel from '../DesktopPlaylistPanel';
import theme from 'theme.js';
import styled from '@emotion/styled';


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
  top: -28px;
  right: -9px;
  font-size: 32px;
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
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoader(false), 250);
  }, []);

  return (
    <>
      <DesktopPlayerContainer isLoading={isLoading}>
        <Flex maxW='1100px' flex='1' height='60px'>

          <Flex flex='1' align='center' minWidth='275px'>
            {!currentlyPlaying._id && playlist.length === 0
              ? <Text color={`${theme.colors.etBlue}`} style={{ fontFamily: 'Spotify-Bold' }}>
                <Flex alignItems='center'>
                  <Box>Add music to your playlist</Box>
                  {/* <Box pl={2} pt={1}>
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.871 4.95783H0.67749V6.99008H12.871V4.95783ZM12.871 0.893311H0.67749V2.92557H12.871V0.893311ZM16.9356 9.02234V4.95783H14.9033V9.02234H10.8388V11.0546H14.9033V15.1191H16.9356V11.0546H21.0001V9.02234H16.9356ZM0.67749 11.0546H8.80652V9.02234H0.67749V11.0546Z" fill={`${theme.colors.etBlue}`} />
                    </svg>
                  </Box> */}
                </Flex>
              </Text>
              :
              <>
                <Image
                  src={`/uploads/${currentlyPlaying.art_name}`}
                  h='74px'
                  w='74px'
                  fallbackSrc="/sonic.gif"
                />

                <Flex direction='column' pl={4}>
                  <Text fontSize='sm' color='white' style={{ fontFamily: 'Spotify-Bold' }}>
                    {currentlyPlaying.artist_name}
                  </Text>
                  <Text fontSize='sm' color='white'  >
                    {currentlyPlaying.track_name}
                  </Text>
                </Flex>
              </>
            }

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