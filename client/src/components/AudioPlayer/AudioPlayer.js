import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import MiniPlayer from './MiniPlayer';
import DesktopPlayer from './DesktopPlayer';
import axios from 'axios';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import { CSSTransition } from 'react-transition-group';
import MobileNavigation from 'components/MobileNavigation';
import MobilePlaylistPanel from './MobilePlaylistPanel';
import useWindowSize from 'hooks/useWindowSize';
import useEventListener from 'hooks/useEventListener';
import toast from 'util/toast';
import debounce from 'util/debounce';
import theme from 'theme.js';

const slideHOC = (InputComponent) => {
  return (props) => (
    <CSSTransition {...props}>
      <InputComponent className='panel2' />
    </CSSTransition>
  );
};

const Panel = (props) => (
  <div {...props}>
    <MobilePlaylistPanel {...props} />
  </div>
);

const transProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
  timeout: {
    enter: 250,
    exit: 250,
  },
  classNames: 'panel2',
};

const PlaylistPanel = slideHOC(Panel);

const AudioPlayer = ({ playlist, UserActions, auth, coins }) => {
  const [playlistVisible, setPlaylistVisibility] = useState(false);
  const [loading, setPending] = useState(false);

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
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
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
      toast('Not enough coins');
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

  if (isMobile && isSafari()) {
    bindSafariAutoPlayEvents();
  }


  return (
    <Fragment>
      <audio key='audio' ref={audio} type='audio/mpeg' />

      {(isMobile && playlist.length > 0) && (
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
          />
        </>
      )}

      {isMobile && <MobileNavigation playlistVisible={playlistVisible} setPaylistVisibility={setPlaylistVisibility} />}

      {!isMobile && (
        <DesktopPlayer
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
          loading={loading}
        />
      )}

      <PlaylistPanel
        in={playlistVisible}
        {...transProps}
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
    </Fragment>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    playlist: state.user.playlist,
    coins: state.user.coins,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(AudioPlayer);
