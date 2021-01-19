import React, { Fragment, useState } from 'react';
import { Box, Text, Flex, Image, Button } from '@chakra-ui/core';
import { Playlist, Previous, Next, Play, Pause, Toll } from 'components/Icons';
import { CSSTransition } from 'react-transition-group';
import DesktopPlaylistPanel from '../DesktopPlaylistPanel';
import { connect } from 'react-redux';
import theme from 'theme.js';

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
      loading={props.loading}
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
  track,
  progressBar,
  remove,
  fetch,
  currentlyPlaying,
  coins,
  playlist,
  loading,
}) => {
  const [visible, setVisibility] = useState(false);

  return (
    <Fragment>
      <div className='large-player'>
        <Flex maxW='1100px' flex='1' height='60px'>
          <Flex flex='1' align='center' minWidth='275px'>
            <Image
              src={track.length > 0 ? `/uploads/${track[0].art_name}` : `./filler.jpg`}
              h='48px'
              w='48px'
              borderRadius='50%'
              border='1px'
              borderColor={`${theme.colors.etGreen}`}
            />
            )
            <Flex direction='column' pl={4}>
              {track.length > 0 ? (
                <>
                  <Text color='gray.600' fontSize='sm'>
                    {track[0].artist_name}
                  </Text>
                  <Text color='gray.500' fontSize='sm'>
                    {track[0].track_name}
                  </Text>
                </>
              ) : undefined}
            </Flex>
          </Flex>
          <Flex flex='2' direction='column' justify='center' align='center'>
            <Box pb={3}>
              <Button variant='link' onClick={handlePrevious}>
                <Previous />
              </Button>
              <Button variant='link' onClick={handlePlay} isLoading={loading}>
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
              <Box minWidth='50px' px={2}>
                {coins}
              </Box>
            </Flex>

            <Button variant='link' onClick={() => setVisibility(!visible)}>
              <Box style={{ position: 'relative' }}>
                <Playlist active={visible} />
                <Box
                  style={{
                    position: 'absolute',
                    color: `${theme.colors.etGreen}`,
                    top: '-9px',
                    right: '-6px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {playlist?.length === 0 ? '' : '•'}
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
        loading={loading}
      />
    </Fragment>
  );
};

export default connect((state) => ({
  playlist: state.user.playlist,
  updatedAt: state.user.updatedAt,
}))(DesktopPlayer);
