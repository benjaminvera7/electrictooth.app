import React, { Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import DesktopPlayer from './DesktopPlayer';
import axios from 'axios';
import Slider from 'rc-slider/lib/Slider';
import { Flex } from '@chakra-ui/react';
import 'rc-slider/assets/index.css';
import MiniPlayer from './MiniPlayer';
import MobileNavigation from 'components/MobileNavigation';
import MobilePlaylistPanel from './MobilePlaylistPanel';
import useWindowSize from 'hooks/useWindowSize';
import useEventListener from 'hooks/useEventListener';
import { useToast } from '@chakra-ui/react';
import theme from 'theme.js';


const AudioPlayer = ({ UserActions, auth, coins, playlist }) => {
  const [playlistVisible, setPlaylistVisibility] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [lastVolume, setLastVolume] = useState(0.70);
  const [volume, setVolume] = useState(0.70);
  const [firstLoad, setFirstLoad] = useState(true);
  const toast = useToast();
  const audio = useRef(null);
  const isMobile = useWindowSize();

  const [timelineDot, setTimelineDot] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState({});


  useEffect(() => {
    if (playlist.length > 0 && !currentlyPlaying._id) {


      if (localStorage.getItem('lastSongPlayed')) {
        let index = playlist?.findIndex((track) => getLastSongIndex(track, localStorage.getItem('lastSongPlayed')))
        setCurrentlyPlaying(playlist[index])
      } else {
        setCurrentlyPlaying(playlist[0])
      }

    }
  }, [playlist, currentlyPlaying._id])

  const timeUpdate = () => {
    const playPercent = 100 * (audio.current.currentTime / audio.current.duration);
    setTimelineDot(playPercent);
    return timelineDot;
  };

  const getLastSongIndex = (track, id) => track._id === id;

  const fetch = async (id) => {

    const [track] = playlist.filter((track) => track._id === id);

    if (currentlyPlaying._id !== id) {
      setCurrentlyPlaying(track);
    }

    setLoading(true);

    try {
      const response = await axios({
        url: `/api/v1/stream/${id}`,
        method: 'GET',
        responseType: 'blob',
        headers: { Authorization: auth },
      });

      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = window.webkitURL.createObjectURL(blob);

      UserActions.getCoins(auth);

      setPlaying(true);
      setLoading(false);

      audio.current.src = url;
      audio.current.play().then(_ => {
        document.title = `${track.track_name} by ${track.artist_name}`;
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: `${track.track_name}`,
            artist: `${track.artist_name}`,
            album: `${track.album_name}`,
            artwork: [{ src: `/uploads/${track.art_name}` }]
          });
        }

        localStorage.setItem('lastSongPlayed', track._id);
      }).catch(error => console.log(error));;



    } catch (error) {
      setPlaying(false);
      setLoading(false);

      toast({
        title: "Come back when you get some money, buddy!",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      console.log('something went wrong', error);
    }

  }


  const next = () => {
    const [track] = playlist.filter((track) => track._id === currentlyPlaying._id);
    if (track === undefined && playlist.length >= 1) {
      return fetch(playlist[0]._id)
    }
    if (playlist.length > 0) {
      const current = playlist.indexOf(track);
      const newIndex = (current + 1) % playlist.length;
      return fetch(playlist[newIndex]._id)
    }
  };

  const previous = () => {
    const [track] = playlist.filter((track) => track._id === currentlyPlaying._id);

    if (track === undefined && playlist.length >= 1) {
      return fetch(playlist[0]._id)
    }

    if (playlist.length > 1 && track) {
      let current = playlist.indexOf(track);
      if (current === 0) {
        let last = playlist.length - 1;
        return fetch(playlist[last]._id);
      } else {
        let prev = current - 1;
        return fetch(playlist[prev]._id);
      }
    }
  };

  const play = () => {

    if (currentlyPlaying._id === undefined) {
      toast({
        title: "Add music to your playlist",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    if (playing) {
      setPlaying(false);
      return audio.current.pause();
    }

    if (!playing && firstLoad) {
      setFirstLoad(false);
      return fetch(currentlyPlaying._id);
    }

    if (currentlyPlaying._id && !playing) {
      setPlaying(true);
      return audio.current.play();
    }


  };


  const onHandleProgress = (value) => {
    audio.current.currentTime = value;
  };

  const onVolumeChange = (value) => {
    if (value === 0) {
      setVolume(0);
      setMuted(true)
      audio.current.volume = value;
      return
    }
    setVolume(value);
    setMuted(false);
    setLastVolume(value);
    audio.current.volume = value;
  }

  const VolumeSlider = (
    <Flex id='volume-slider' style={{ 'width': '32px', 'height': "120px", 'backgroundColor': `${theme.colors.etGray}`, 'padding-top': '16px', borderRadius: '8px' }} justifyContent="center">
      <Slider vertical={true} style={{ 'height': '92px' }}
        max={1}
        min={0}
        defaultValue={volume}
        value={volume}
        onChange={onVolumeChange}
        step={0.03}
        railStyle={{
          backgroundColor: '#5b676d',
        }}
        trackStyle={{
          backgroundColor: `${theme.colors.etViolet}`,
        }}
        handleStyle={{
          borderColor: `${theme.colors.etViolet}`,
          backgroundColor: `${theme.colors.etViolet}`
        }}
      />
    </Flex>
  )

  const ProgressBar = (
    <div className='progress-bar' style={isMobile ? { width: '96%' } : { width: '505px' }}>
      <Slider
        max={playing ? Math.ceil(audio.current.duration) : 0}
        defaultValue={0}
        value={playing ? Math.ceil(audio.current.currentTime) : 0}
        onChange={onHandleProgress}
        railStyle={{
          backgroundColor: '#5b676d',
        }}
        trackStyle={{
          backgroundColor: `${theme.colors.etViolet}`,
        }}
        handleStyle={{
          borderColor: `${theme.colors.etViolet}`,
          backgroundColor: `${theme.colors.etViolet}`
        }}
      />
    </div>
  );

  const MiniProgressBar = (
    <div class="mini-progress-bar">
      <Slider
        style={{ padding: '2px 0' }}
        max={playing ? Math.ceil(audio.current.duration) : 0}
        defaultValue={0}
        value={playing ? Math.ceil(audio.current.currentTime) : 0}
        railStyle={{
          backgroundColor: 'black',
          opacity: '0.5',
          borderRadius: '0',
          height: 2
        }}
        trackStyle={{
          backgroundColor: `${theme.colors.etViolet}`,
          borderRadius: '0',
          height: 2,
        }}
        handleStyle={{
          display: 'none'
        }}
      />
    </div>
  )

  const remove = (id) => {
    UserActions.removeFromPlaylist(id, auth);
  };

  const handlePlay = e => {
    if (e.code === 'Space') {
      e.preventDefault();
      play();
    }
  }


  useEventListener('ended', next, audio.current);
  useEventListener('timeupdate', timeUpdate, audio.current);
  useEventListener('keydown', handlePlay)

  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('previoustrack', () => previous());
    navigator.mediaSession.setActionHandler('nexttrack', () => next());
    navigator.mediaSession.setActionHandler('play', () => play());
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      audio.current.currentTime = details.seekTime;
    });
  }

  return (
    <Fragment>
      <audio key='audio' ref={audio} type='audio/mpeg' />

      {isMobile && (
        <>
          <MiniPlayer
            playing={playing}
            handlePlay={play}
            handleNext={next}
            handlePrevious={previous}
            progressBar={ProgressBar}
            remove={remove}
            fetch={fetch}
            currentlyPlaying={currentlyPlaying}
            coins={coins}
            playlistVisible={playlistVisible}
            setPlaylistVisibility={setPlaylistVisibility}
            loading={loading}
            miniProgressBar={MiniProgressBar}
            playlist={playlist}
          />

          <MobilePlaylistPanel
            playlistVisible={playlistVisible}
            setPlaylistVisibility={setPlaylistVisibility}
            playlist={playlist}
            currentlyPlaying={currentlyPlaying}
            handlePlay={play}
            playing={playing}
            fetch={fetch}
            remove={remove}
            loading={loading}
          />

          <MobileNavigation
            playlistVisible={playlistVisible}
            setPaylistVisibility={setPlaylistVisibility}
          />
        </>
      )}

      {!isMobile && (
        <DesktopPlayer
          playing={playing}
          handlePlay={play}
          handleNext={next}
          handlePrevious={previous}
          currentlyPlaying={currentlyPlaying}
          progressBar={ProgressBar}
          remove={remove}
          fetch={fetch}
          coins={coins}
          loading={loading}
          playlist={playlist}
          volumeSlider={VolumeSlider}
          muted={muted}
          setMuted={() => {

            if (muted === true) {
              setMuted(false)
              onVolumeChange(lastVolume);
              return
            }

            setMuted(true)
            setLastVolume(volume);
            onVolumeChange(0);
          }}
        />)
      }

    </Fragment>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    playlist: state.user.playlist,
    coins: state.user.coins
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(AudioPlayer);