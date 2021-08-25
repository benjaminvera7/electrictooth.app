import React, { useEffect, useState } from 'react';
import { Text, Button, Flex, Box, Image } from '@chakra-ui/react';
import { Play, Pause } from 'components/Icons';
import MobilePlayer from '../MobilePlayer';
import styled from '@emotion/styled';
import theme from 'theme.js';



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
    transform: ${props => props.isLoading ? 'translateY(160px)' : 'translateY(0)'};
    transition-delay: ${props => props.isLoading ? '0ms' : '350ms'};
    transition: transform 200ms ease-out;
`;

const MiniPlayer = ({
  playing,
  handlePlay,
  handleNext,
  handlePrevious,
  progressBar,
  currentlyPlaying,
  fetch,
  remove,
  coins,
  loading,
  miniProgressBar,
  playlist
}) => {
  const [playerVisible, setPlayerVisibility] = useState(false);
  const [isLoading, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 250);
  }, []);

  return (
    <>
      <MiniPlayerContainer isLoading={isLoading}>

        {miniProgressBar}

        <Flex h='50px' w='50px' onClick={() => setPlayerVisibility(!playerVisible)} justifyContent='center'>

          {!currentlyPlaying._id && playlist.length === 0
            ?
            <Box backgroundColor={`${theme.colors.etBlue}`} h='50px' w='50px' opacity='0.7' />
            :
            <>
              <Image src={`/uploads/${currentlyPlaying.art_name}`} objectFit='cover' fallbackSrc="/mascot.jpg" />
            </>
          }
        </Flex>

        <Flex pl={4} flexDirection="column" justifyContent='center' flex='2' onClick={() => setPlayerVisibility(!playerVisible)}>
          {!currentlyPlaying._id && playlist.length === 0
            ?
            <>
              <Text color={`${theme.colors.etBlue}`} style={{ fontFamily: 'Spotify-Bold' }}>
                <Flex alignItems='center' justifyContent='center'>
                  <Box>Add music to your playlist</Box>
                  <Box pl={2} pt={1}>
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.871 4.95783H0.67749V6.99008H12.871V4.95783ZM12.871 0.893311H0.67749V2.92557H12.871V0.893311ZM16.9356 9.02234V4.95783H14.9033V9.02234H10.8388V11.0546H14.9033V15.1191H16.9356V11.0546H21.0001V9.02234H16.9356ZM0.67749 11.0546H8.80652V9.02234H0.67749V11.0546Z" fill={`${theme.colors.etBlue}`} />
                    </svg>
                  </Box>
                </Flex>
              </Text>
            </>
            :
            <>
              <Text fontSize='xs' style={{ fontFamily: 'Spotify-Bold' }} color='white' maxWidth='275px' isTruncated>
                {currentlyPlaying.track_name}
              </Text>
              <Text fontSize='xs' style={{ fontFamily: 'Spotify-Light' }} color='white'>
                {currentlyPlaying.artist_name}
              </Text>
            </>
          }

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


      <MobilePlayer
        playing={playing}
        handlePlay={handlePlay}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        progressBar={progressBar}
        currentlyPlaying={currentlyPlaying}
        fetch={fetch}
        remove={remove}
        coins={coins}
        playerVisible={playerVisible}
        setPlayerVisibility={setPlayerVisibility}
        loading={loading}
      />
    </>
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
