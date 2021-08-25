import React, { Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import DesktopPlayer from './DesktopPlayer';
import axios from 'axios';
import Slider from 'rc-slider/lib/Slider';
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
  const [firstLoad, setFirstLoad] = useState(true);
  const toast = useToast();
  const audio = useRef(null);
  const isMobile = useWindowSize();

  const [timelineDot, setTimelineDot] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState({})

  useEffect(() => {
    if (playlist.length > 0 && !currentlyPlaying._id) {
      setCurrentlyPlaying(playlist[0])
    }
  }, [playlist, currentlyPlaying._id])

  const timeUpdate = () => {
    const playPercent = 100 * (audio.current.currentTime / audio.current.duration);
    setTimelineDot(playPercent);
    return timelineDot;
  };


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
      audio.current.play();


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
    e.preventDefault();
    if (e.code === 'Space') {
      play();
    }
  }


  useEventListener('ended', next, audio.current);
  useEventListener('timeupdate', timeUpdate, audio.current);
  useEventListener('keydown', handlePlay)

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

/*
  const [playlistVisible, setPlaylistVisibility] = useState(false);
  const [loading, setPending] = useState(false);
  const toast = useToast()

  const isMobile = useWindowSize();
  const audio = useRef(null);

  let [currentTrackId, setCurrentTrackId] = useState('');
  let [playing, setPlaying] = useState(false);
  // eslint-disable-next-line
  let [timelineDot, setTimelineDot] = useState(0);
  let [firstLoad, setFirstLoad] = useState(false);

  let track = [];

  track = playlist?.filter((track) => track._id === currentTrackId);

  if (playlist.length >= 1 && currentTrackId === '') {
    setCurrentTrackId(playlist[0]._id);
    setFirstLoad(true);
  }

  const timeUpdate = () => {
    let playPercent = 100 * (audio.current.currentTime / audio.current.duration);
    setTimelineDot(playPercent);
  };

  const onHandleProgress = (value) => {
    audio.current.currentTime = value;
  };

  const ProgressBar = (
    <div className='progress-bar' style={isMobile ? { width: '96%' } : { width: '505px' }}>
      <Slider
        max={playing ? Math.ceil(audio.current.duration) : 0}
        defaultValue={0}
        value={playing ? Math.ceil(audio.current.currentTime) : 0}
        onChange={onHandleProgress}
        railStyle={{
          backgroundColor: '#5b676d'
        }}
        trackStyle={{
          backgroundColor: `${theme.colors.etViolet}`
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
          borderRadius: '0'
        }}
        trackStyle={{
          backgroundColor: `${theme.colors.etViolet}`,
          borderRadius: '0'
        }}
        handleStyle={{
          display: 'none'
        }}
      />
    </div>
  )

  const next = (e) => {
    //document.getElementsByName('play')[0].focus();


    let [track] = playlist.filter((track) => track._id === currentTrackId);

    if (playlist.length > 1 && track) {
      let current = playlist.indexOf(track);
      let last = playlist.length - 1;

      if (current === last) {
        let start = 0;
        return fetch(playlist[start]._id);
      } else {
        let next = current + 1;
        return fetch(playlist[next]._id);
      }
    }
  };

  const previous = () => {
    //document.getElementsByName('play')[0].focus();


    let [track] = playlist.filter((track) => track._id === currentTrackId);

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

  const fetch = async (id) => {
    setPending(true);

    if (playing && currentTrackId === id) {
      setPlaying(false);
      setPending(false);
      audio.current.pause();
      return;
    }

    setCurrentTrackId(id);

    try {
      let response = await axios({
        url: `/api/v1/stream/${id}`,
        method: 'GET',
        responseType: 'blob',
        headers: { Authorization: auth },
      });

      let blob = new Blob([response.data], { type: 'audio/mpeg' });
      let url;

      try {
        url = window.webkitURL.createObjectURL(blob);
      } catch (err) {
        // Firefox
        url = window.URL.createObjectURL(blob);
      }

      audio.current.src = url;

      var playPromise = audio.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            // Automatic playback started!
            // Show playing UI.
            UserActions.getCoins();
            setPlaying(true);
            setPending(false);
          })
          .catch((error) => {
            // Auto-play was prevented
            // Show paused UI.
            console.log(error);
            setPlaying(false);
            setPending(false);
          });
      }
    } catch (e) {
      setPending(false);
      setPlaying(false);

      toast({
        title: "Not enough coins",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
      console.log('something went wrong', e);
    }
  };

  const play = () => {
    //document.getElementsByName('play')[0].focus();


    if (playing) {
      setPlaying(false);
      return audio.current.pause();
    }

    if (!playing && firstLoad) {
      setFirstLoad(false);
      return fetch(currentTrackId);
    }

    if (currentTrackId && !playing) {
      setPlaying(true);
      return audio.current.play();
    }
  };

  const remove = (id) => {
    UserActions.removeFromPlaylist(id);
  };

  const handlePlay = e => {
    if (e.code === 'Space') {
      //document.getElementsByName('play')[0].focus();
      play();
    }
  }

  useEventListener('ended', next, audio.current);
  useEventListener('timeupdate', timeUpdate, audio.current);
  useEventListener('keydown', debounce(handlePlay, 500, false))
*/

/* {isMobile && (
        <>
          <MiniPlayer
            playing={playing}
            handlePlay={play}
            handleNext={next}
            handlePrevious={previous}
            track={track}
            progressBar={ProgressBar}
            remove={remove}
            fetch={fetch}
            currentlyPlaying={currentTrackId}
            coins={coins}
            playlistVisible={playlistVisible}
            setPlaylistVisibility={setPlaylistVisibility}
            loading={loading}
            miniProgressBar={MiniProgressBar}
          />

          <MobilePlaylistPanel
            playlistVisible={playlistVisible}
            setPlaylistVisibility={setPlaylistVisibility}
            playlist={playlist}
            currentlyPlaying={currentTrackId}
            handlePlay={play}
            playing={playing}
            fetch={fetch}
            remove={remove}
            loading={loading}
          />

          {isMobile && <MobileNavigation playlistVisible={playlistVisible} setPaylistVisibility={setPlaylistVisibility} />}
          </>
        )} */
