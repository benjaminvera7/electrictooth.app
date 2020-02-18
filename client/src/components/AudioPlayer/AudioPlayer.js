import React, { Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import * as playerActions from 'redux/modules/player';
import MiniPlayer from './MiniPlayer';
import DesktopPlayer from './DesktopPlayer';
import axios from 'axios';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

import useWindowSize from 'hooks/useWindowSize';

const AudioPlayer = ({ playlist, UserActions, auth, PlayerActions, coins }) => {
  const isMobile = useWindowSize();
  const audio = useRef(null);

  let [currentSongId, setCurrentSongId] = useState('');
  let [playing, setPlaying] = useState(false);
  // eslint-disable-next-line
  let [timelineDot, setTimelineDot] = useState(0);

  let song;

  try {
    song = playlist.filter((song) => song.id === currentSongId);
  } catch {
    song = [];
  }

  useEffect(() => {
    audio.current.addEventListener('ended', next);
    audio.current.addEventListener('timeupdate', timeUpdate, false);

    if (isMobile && isSafari()) {
      bindSafariAutoPlayEvents();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongId]);

  const timeUpdate = () => {
    let playPercent =
      100 * (audio.current.currentTime / audio.current.duration);

    setTimelineDot(playPercent);
  };
  const bindSafariAutoPlayEvents = () => {
    document.addEventListener(
      'click',
      () => {
        mockAutoPlayForMobile();
      },
      { once: true },
    );
  };

  const mockAutoPlayForMobile = () => {
    if (!playing) {
      audio.current.load();
      audio.current.pause();
      audio.current.play();
    }
  };

  const isSafari = () => {
    return (
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    );
  };

  const onHandleProgress = (value) => {
    audio.current.currentTime = value;
  };

  const ProgressBar = (
    <div
      className='progress-bar'
      style={isMobile ? { width: '90%' } : { width: '505px' }}
    >
      <Slider
        max={playing ? Math.ceil(audio.current.duration) : 0}
        defaultValue={0}
        value={playing ? Math.ceil(audio.current.currentTime) : 0}
        onChange={onHandleProgress}
      />
    </div>
  );

  const next = () => {
    let song = playlist.filter((song) => song.id === currentSongId);
    let currentSongIndex = playlist.indexOf(song[0]);
    let newSongIndex = currentSongIndex + 1;
    let playlistLength = playlist.length - 1;
    if (newSongIndex > playlistLength) {
      return fetch(playlist[0].id);
    } else {
      return fetch(playlist[newSongIndex].id);
    }
  };

  const previous = () => {
    let song = playlist.filter((song) => song.id === currentSongId);

    let currentSongIndex = playlist.indexOf(song[0]);
    let newSongIndex = currentSongIndex - 1;
    let playlistLength = playlist.length - 1;

    if (newSongIndex < 0) {
      return fetch(playlist[playlistLength].id);
    } else {
      return fetch(playlist[newSongIndex].id);
    }
  };

  const fetch = async (id) => {
    if (playing && currentSongId === id) {
      setPlaying(false);
      audio.current.pause();
      return;
    }

    setCurrentSongId(id);

    try {
      let response = await axios({
        url: `${process.env.REACT_APP_API_URL}/stream/${id}`,
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
      audio.current.play();

      UserActions.getCoins(auth);
      setPlaying(true);
    } catch (e) {
      console.log('song change', e);
    }
  };

  const play = () => {
    if (playing) {
      setPlaying(false);
      return audio.current.pause();
    }

    if (currentSongId) {
      setPlaying(true);
      audio.current.play();
    }

    if (!playing & (currentSongId === '') & (playlist.length > 0)) {
      fetch(playlist[0].id);
    }
  };

  const remove = (id) => {
    PlayerActions.removeSong(id);
  };

  return (
    <Fragment>
      <audio key='audio' ref={audio} type='audio/mpeg' />

      {isMobile ? (
        <MiniPlayer
          playing={playing}
          handlePlay={play}
          handleNext={next}
          handlePrevious={previous}
          song={song}
          progressBar={ProgressBar}
          remove={remove}
          fetch={fetch}
          currentlyPlaying={currentSongId}
          coins={coins}
        />
      ) : (
        <DesktopPlayer
          playing={playing}
          handlePlay={play}
          handleNext={next}
          handlePrevious={previous}
          song={song}
          progressBar={ProgressBar}
          remove={remove}
          fetch={fetch}
          currentlyPlaying={currentSongId}
          coins={coins}
        />
      )}
    </Fragment>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    playlist: state.player.playlist,
    coins: state.user.coins,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    PlayerActions: bindActionCreators(playerActions, dispatch),
  }),
)(AudioPlayer);
