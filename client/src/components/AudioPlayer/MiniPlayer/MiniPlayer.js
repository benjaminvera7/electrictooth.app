import React, { Fragment, useState } from 'react';
import { Text, Button, Flex } from '@chakra-ui/core';
import { Play, ArrowUp, Pause } from 'components/Icons';
import { CSSTransition } from 'react-transition-group';
import MobilePlayer from '../MobilePlayer';
import MobileNavigation from 'components/MobileNavigation';

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
      toggle={props.toggle}
      playing={props.playing}
      handlePlay={props.handlePlay}
      handleNext={props.handleNext}
      handlePrevious={props.handlePrevious}
      progressBar={props.progressBar}
      song={props.song}
      currentlyPlaying={props.currentlyPlaying}
      fetch={props.fetch}
      remove={props.remove}
      coins={props.coins}
    />
  </div>
);

const MobilePlayerPanel = slideHOC(Panel);

const transProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
  timeout: {
    enter: 350,
    exit: 500,
  },
  classNames: 'panel',
};

const MiniPlayer = ({
  playing,
  handlePlay,
  handleNext,
  handlePrevious,
  song,
  progressBar,
  currentlyPlaying,
  fetch,
  remove,
  coins,
}) => {
  const [visible, setVisibility] = useState(false);

  return (
    <Fragment>
      <div className='mini-player'>
        <Button
          variant='link'
          onClick={() => setVisibility(!visible)}
          style={{ minHeight: '44px' }}
        >
          <ArrowUp />
        </Button>

        <Flex
          direction='column'
          align='center'
          onClick={() => setVisibility(!visible)}
          w='100%'
        >
          <Text fontSize='sm'>
            {song.length > 0 ? `${song[0].artist_name}` : `~`}
          </Text>
          <Text color='gray.500' fontSize='sm'>
            {song.length > 0 ? `${song[0].song_name}` : undefined}
          </Text>
        </Flex>

        <Button
          variant='link'
          style={{ minHeight: '44px' }}
          onClick={handlePlay}
        >
          {playing ? <Pause /> : <Play />}
        </Button>
      </div>

      <MobileNavigation />

      <MobilePlayerPanel
        in={visible}
        {...transProps}
        toggle={setVisibility}
        playing={playing}
        handlePlay={handlePlay}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        progressBar={progressBar}
        song={song}
        currentlyPlaying={currentlyPlaying}
        fetch={fetch}
        remove={remove}
        coins={coins}
      />
    </Fragment>
  );
};

export default MiniPlayer;
