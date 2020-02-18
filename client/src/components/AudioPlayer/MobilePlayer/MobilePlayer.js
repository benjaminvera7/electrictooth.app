import React, { useState, Fragment } from 'react';
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
import { CSSTransition } from 'react-transition-group';

import MobilePlaylistPanel from '../MobilePlaylistPanel';
import { connect } from 'react-redux';

const slideHOC = (InputComponent) => {
  return (props) => (
    <CSSTransition {...props}>
      <InputComponent className='panel2' />
    </CSSTransition>
  );
};

const Panel = (props) => (
  <div {...props}>
    <MobilePlaylistPanel
      toggle={props.toggle}
      playlist={props.playlist}
      handlePlay={props.handlePlay}
      playing={props.playing}
      fetch={props.fetch}
      remove={props.remove}
      currentlyPlaying={props.currentlyPlaying}
    />
  </div>
);

const transProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
  timeout: {
    enter: 350,
    exit: 500,
  },
  classNames: 'panel2',
};

const PlaylistPanel = slideHOC(Panel);

const MobilePlayer = ({
  toggle,
  playing,
  handlePlay,
  handleNext,
  handlePrevious,
  progressBar,
  song,
  playlist,
  currentlyPlaying,
  fetch,
  remove,
  coins,
}) => {
  const [visible, setVisibility] = useState(false);
  return (
    <Fragment>
      <Box mt={-1}>
        <Image
          src={
            song.length > 0
              ? `${song[0].art_url}`
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

          <Button variant='link' onClick={handlePlay}>
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
          onClick={() => toggle(false)}
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
          onClick={() => setVisibility(!visible)}
          style={{ minHeight: '44px' }}
        >
          <Box style={{ position: 'relative' }}>
            <Playlist />
            <Box
              style={{
                position: 'absolute',
                color: '#3182ce',
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

      <PlaylistPanel
        in={visible}
        {...transProps}
        toggle={setVisibility}
        playlist={playlist}
        currentlyPlaying={currentlyPlaying}
        handlePlay={handlePlay}
        playing={playing}
        fetch={fetch}
        remove={remove}
      />
    </Fragment>
  );
};

export default connect((state) => ({
  playlist: state.player.playlist,
  updatedAt: state.player.updatedAt,
}))(MobilePlayer);
