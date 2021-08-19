import React, { Fragment, useState } from 'react';
import { Text, Button, Flex, Box, Image } from '@chakra-ui/react';
import { Play, Pause, ArrowUp } from 'components/Icons';
import { CSSTransition } from 'react-transition-group';
import MobilePlayer from '../MobilePlayer';
import styled from '@emotion/styled';


const slideHOC = (InputComponent) => {
  return (props) => (
    <CSSTransition {...props}>
      <InputComponent className='panel' />
    </CSSTransition>
  );
};

const Panel = (props) => (
  <div {...props}>
    <MobilePlayer
      playing={props.playing}
      handlePlay={props.handlePlay}
      handleNext={props.handleNext}
      handlePrevious={props.handlePrevious}
      progressBar={props.progressBar}
      track={props.track}
      currentlyPlaying={props.currentlyPlaying}
      fetch={props.fetch}
      remove={props.remove}
      coins={props.coins}
      playlistVisible={props.playlistVisible}
      setPlaylistVisibility={props.setPlaylistVisibility}
      playerVisible={props.playerVisible}
      setPlayerVisibility={props.setPlayerVisibility}
      loading={props.loading}
    />
  </div>
);

const MobilePlayerPanel = slideHOC(Panel);

const transProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
  timeout: {
    enter: 250,
    exit: 200,
  },
  classNames: 'panel',
};

const MiniProgressBar = styled(Box)`
  height: 2px;
  position: absolute;
  width: 40%;
  top: 0;
  left: 0;
  background-color: #9480FF;
`;

const MiniPlayer = ({
  playing,
  handlePlay,
  handleNext,
  handlePrevious,
  track,
  progressBar,
  currentlyPlaying,
  fetch,
  remove,
  coins,
  playlistVisible,
  setPlaylistVisibility,
  loading,
}) => {
  const [playerVisible, setPlayerVisibility] = useState(false);

  return (
    <Fragment>
      <div className='mini-player'>

        <MiniProgressBar />

        <Image
          src={track.length > 0 ? `/uploads/${track[0].art_name}` : null}
          h='50px'
          w='50px'
          objectFit="cover"
          borderBottom='1px solid #1d1d1d'
        />

        <Flex direction='column' onClick={() => setPlayerVisibility(!playerVisible)} w='100%' paddingLeft={4}>
          <Text fontSize='sm' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='180px' isTruncated>
            {track.length > 0 ? `${track[0].track_name}` : undefined}
          </Text>
          <Text fontSize='sm' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {track.length > 0 ? `${track[0].artist_name}` : null}
          </Text>
        </Flex>

        <Button variant='link' style={{ minHeight: '44px' }} onClick={handlePlay} isLoading={loading} pr={4}>
          {playing ? <Pause /> : <Play />}
        </Button>
      </div>

      <MobilePlayerPanel
        in={playerVisible}
        {...transProps}
        playing={playing}
        handlePlay={handlePlay}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        progressBar={progressBar}
        track={track}
        currentlyPlaying={currentlyPlaying}
        fetch={fetch}
        remove={remove}
        coins={coins}
        playlistVisible={playlistVisible}
        setPlaylistVisibility={setPlaylistVisibility}
        playerVisible={playerVisible}
        setPlayerVisibility={setPlayerVisibility}
        loading={loading}
      />
    </Fragment>
  );
};

export default MiniPlayer;
