import React, { useRef, useState, useEffect } from 'react';
import { Box, Text, Flex, Image, Button, Tooltip } from '@chakra-ui/react';
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
  top: -22px;
  right: -9px;
  font-size: 26px;
  font-weight: bold;
`;

const VolumeSliderContainer = styled(Box)`
  display: ${props => props.isVisible ? 'block' : 'none'};
  transition: transform 200ms ease-out;
`


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
  volumeSlider,
  muted,
  setMuted,
}) => {
  const [visible, setVisibility] = useState(false);
  const [volumeSliderVisible, setVolumeSliderVisiblity] = useState(false)
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
                    {currentlyPlaying.track_name}
                  </Text>
                  <Text fontSize='sm' color='white' style={{ cursor: 'default' }}>
                    {currentlyPlaying.artist_name}
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
            <Tooltip hasArrow label="Stream Coins" bg={`${theme.colors.etViolet}`} openDelay={300} offset={[0, -10]}>
              <Flex align='center' color={`${theme.colors.etGreen}`}>
                <Box>
                  <Toll height='26px' width='26px' />
                </Box>

                <Box minWidth='50px' px={2} color={`${theme.colors.etBlue}`}>
                  {coins}
                </Box>
              </Flex>
            </Tooltip>

            <Flex align="center" style={{ 'position': 'relative' }}>
              <Button variant='link' onMouseOver={() => setVolumeSliderVisiblity(true)} onMouseLeave={() => setVolumeSliderVisiblity(false)} onClick={() => setMuted()}>
                {muted ?
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.34005 2.93005L2.93005 4.34005L7.29005 8.70005L7.00005 9.00005H3.00005V15.0001H7.00005L12.0001 20.0001V13.4101L16.1801 17.5901C15.5301 18.0801 14.8001 18.4701 14.0001 18.7001V20.7601C15.3401 20.4601 16.5701 19.8401 17.6101 19.0101L19.6601 21.0601L21.0701 19.6501L4.34005 2.93005ZM19.0001 12.0001C19.0001 12.8201 18.8501 13.6101 18.5901 14.3401L20.1201 15.8701C20.6801 14.7001 21.0001 13.3901 21.0001 12.0001C21.0001 7.72005 18.0101 4.14005 14.0001 3.23005V5.29005C16.8901 6.15005 19.0001 8.83005 19.0001 12.0001ZM12.0001 4.00005L10.1201 5.88005L12.0001 7.76005V4.00005ZM16.5001 12.0001C16.5001 10.2301 15.4801 8.71005 14.0001 7.97005V9.76005L16.4801 12.2401C16.4901 12.1601 16.5001 12.0801 16.5001 12.0001Z" fill={`${theme.colors.etBlue}`} />
                    </svg>
                  </>
                  :
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="ffffff" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8.99998V15H7L12 20V3.99998L7 8.99998H3ZM16.5 12C16.5 10.23 15.48 8.70998 14 7.96998V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.22998V5.28998C16.89 6.14998 19 8.82998 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.71998 18.01 4.13998 14 3.22998Z" fill={`${theme.colors.etBlue}`} />
                    </svg>
                  </>
                }
              </Button>
              <VolumeSliderContainer style={{ 'position': 'absolute', 'left': '4px', 'bottom': "43px" }} isVisible={volumeSliderVisible} onMouseOver={() => setVolumeSliderVisiblity(true)} onMouseLeave={() => setVolumeSliderVisiblity(false)}>
                {volumeSlider}
              </VolumeSliderContainer>
            </Flex>

            <Tooltip hasArrow label="Your Playlist" bg={`${theme.colors.etViolet}`} openDelay={300} offset={[0, -10]}>
              <Button variant='link' id="playlistIconButton" onClick={() => {
                setVisibility(!visible)
              }}>
                <Box style={{ position: 'relative' }}>
                  <Playlist active={visible} />
                  <NotificationDot id='notificationDot'>
                    {playlist?.length === 0 ? '' : '•'}
                  </NotificationDot>
                </Box>
              </Button>
            </Tooltip>

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