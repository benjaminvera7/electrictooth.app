import React, { Fragment, useState } from 'react';
import { Box, Text, Flex, Image, Button } from '@chakra-ui/core';
import { Playlist, Previous, Next, Play, Pause, Toll } from 'components/Icons';
import { CSSTransition } from 'react-transition-group';
import DesktopPlaylistPanel from '../DesktopPlaylistPanel';

import { connect } from 'react-redux';

const slideHOC = (InputComponent) => {
  return (props) => (
    <CSSTransition {...props}>
      <InputComponent className='panel3' />
    </CSSTransition>
  );
};

const Panel = (props) => (
  <div {...props}>
    <DesktopPlaylistPanel
      toggle={props.toggle}
      playing={props.playing}
      remove={props.remove}
      fetch={props.fetch}
      currentlyPlaying={props.currentlyplaying}
      handlePlay={props.handleplay}
    />
  </div>
);

const PlaylistPanel = slideHOC(Panel);

const transProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
  timeout: {
    enter: 350,
    exit: 500,
  },
  classNames: 'panel3',
};

const DesktopPlayer = ({
  handlePlay,
  handleNext,
  handlePrevious,
  playing,
  song,
  progressBar,
  remove,
  fetch,
  currentlyPlaying,
  coins,
  playlist,
}) => {
  const [visible, setVisibility] = useState(false);

  return (
    <Fragment>
      <div className='large-player'>
        <Flex maxW='1100px' flex='1' height='60px'>
          <Flex flex='1' align='center'>
            {song.length > 0}
            <Image
              src={
                song.length > 0
                  ? `/uploads/${song[0].art_url}`
                  : `https://via.placeholder.com/80`
              }
              maxWidth='80px'
              px={2}
              borderRadius='50%'
            />
            <Flex direction='column' pl={2}>
              <Text>
                {song.length > 0 ? `${song[0].artist_name}` : `Add an album!`}
              </Text>
              <Text color='gray.500'>
                {song.length > 0 ? `${song[0].song_name}` : `press play`}
              </Text>
            </Flex>
          </Flex>
          <Flex flex='2' direction='column' justify='center' align='center'>
            <Box pb={3}>
              <Button variant='link' onClick={handlePrevious}>
                <Previous />
              </Button>
              <Button variant='link' onClick={handlePlay}>
                {playing ? <Pause /> : <Play />}
              </Button>
              <Button variant='link' onClick={handleNext}>
                <Next />
              </Button>
            </Box>

            <Flex justify='center'>{progressBar}</Flex>
          </Flex>
          <Flex flex='1' justify='space-evenly'>
            <Flex align='center'>
              <Box px={2}>
                <Toll height='26px' width='26px' />
              </Box>
              {coins}
            </Flex>

            <Button variant='link' onClick={() => setVisibility(!visible)}>
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
        </Flex>
      </div>

      <PlaylistPanel
        in={visible}
        {...transProps}
        toggle={setVisibility}
        playing={playing}
        remove={remove}
        fetch={fetch}
        currentlyplaying={currentlyPlaying}
        handleplay={handlePlay}
      />
    </Fragment>
  );
};

export default connect((state) => ({
  playlist: state.player.playlist,
  updatedAt: state.player.updatedAt,
}))(DesktopPlayer);
