import React, { Fragment, useState } from 'react';
import { Text, Button, Flex } from '@chakra-ui/core';
import { Play, Pause, ArrowUp } from 'components/Icons';
import { CSSTransition } from 'react-transition-group';
import MobilePlayer from '../MobilePlayer';

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
      <Button
          variant='link'
          onClick={() => setPlayerVisibility(!playerVisible)}
          style={{ minHeight: '44px' }}
        >
          <ArrowUp />
        </Button>

        <Flex direction='column' align='center' onClick={() => setPlayerVisibility(!playerVisible)} w='100%' paddingLeft="8px">
          <Text color='gray.600' fontSize='sm'>
            {track.length > 0 ? `${track[0].artist_name}` : null}
          </Text>
          <Text color='gray.500' fontSize='sm'>
            {track.length > 0 ? `${track[0].track_name}` : undefined}
          </Text>
        </Flex>

        <Button variant='link' style={{ minHeight: '44px' }} onClick={handlePlay} isLoading={loading}>
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
