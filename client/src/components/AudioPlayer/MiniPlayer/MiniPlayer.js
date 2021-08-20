import React, { Fragment, useState } from 'react';
import { Text, Button, Flex, Box, Image } from '@chakra-ui/react';
import { Play, Pause, ArrowUp } from 'components/Icons';
import { CSSTransition } from 'react-transition-group';
import MobilePlayer from '../MobilePlayer';
import styled from '@emotion/styled';
import theme from 'theme.js';

const MiniProgressBarContainer = styled(Box)`
  height: 2px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #9480FF;
`;

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



const MiniPlayerContainer = styled(Box)`
    position: fixed;
    display: flex;
    bottom: 50px;
    background-color: var(--et-gray);
    color: var(--color-50);
    height: 50px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 8px 0 0px;
    border-bottom: 1px solid var(--et-black);
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
  miniProgressBar
}) => {
  const [playerVisible, setPlayerVisibility] = useState(false);

  return (
    <Fragment>


      <MiniPlayerContainer>

        {miniProgressBar}

        <Box width="48px" height="48px" overflow='hidden' position='relative' onClick={() => setPlayerVisibility(!playerVisible)} >
          <Image src={track.length > 0 ? `/uploads/${track[0].art_name}` : null} h='100%' w='100%' objectFit='cover' />
        </Box>

        <Flex pl={4} flexDirection="column" justifyContent='center' flex='2' onClick={() => setPlayerVisibility(!playerVisible)} >
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='275px' isTruncated>
            {track.length > 0 ? `${track[0].track_name}` : undefined}
          </Text>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {track.length > 0 ? `${track[0].artist_name}` : null}
          </Text>
        </Flex>

        <Flex w='48px' justifyContent='center' alignItems='center'>
          <Button
            variant='link'
            aria-label='Add to playlist'
            onClick={handlePlay}
            isLoading={loading}
          >
            {playing ? <Pause /> : <Play />}
          </Button>
        </Flex>
      </MiniPlayerContainer>


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

/*

      <Flex alignItems='center'>
        <Box width="48px" height="48px" overflow='hidden' position='relative' >
          <Link to={`/music/${album.album_name.replaceAll('-', ' ')}`}>
            <Image src={`/uploads/${album.art_name}`} h='100%' w='100%' objectFit='cover' />
          </Link>
        </Box>
        <Flex pl={4} flexDirection="column" justifyContent='center' flex='2'>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='180px' isTruncated>
            {`${album.album_name} (EP)`}
          </Text>
          <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {album.artist_name}
          </Text>
        </Flex>
        <Flex w='48px' justifyContent='center' alignItems='center'>
          <IconButton
            variant='link'
            aria-label='Download album'
            icon={<Download />}
            onClick={(e) => handleSubmit(e, album._id, album.type, album.album_name, album.track_name)}
          />
        </Flex>
        <Flex w='48px' justifyContent='center' alignItems='center'>
          <IconButton
            variant='link'
            aria-label='Add to playlist'
            icon={<PlaylistAdd />}
            onClick={() => addToPlaylist(album._id, album.type)}
          />
        </Flex>
      </Flex>


      ////

              <Image
          src={track.length > 0 ? `/uploads/${track[0].art_name}` : null}
          h='50px'
          w='50px'
          objectFit="cover"
          borderBottom='1px solid #1d1d1d'
        />

        <Flex direction='column' onClick={() => setPlayerVisibility(!playerVisible)} w='100%' paddingLeft={4}>
          <Text fontSize='sm' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='256px' isTruncated>
            {track.length > 0 ? `${track[0].track_name}` : undefined}
          </Text>
          <Text fontSize='sm' style={{ fontFamily: 'Spotify-Light' }} color='white'>
            {track.length > 0 ? `${track[0].artist_name}` : null}
          </Text>
        </Flex>

        <Button variant='link' style={{ minHeight: '44px' }} onClick={handlePlay} isLoading={loading} pr={4}>
          {playing ? <Pause /> : <Play />}
        </Button>

*/
