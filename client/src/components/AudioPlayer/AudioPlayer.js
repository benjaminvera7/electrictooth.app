import React, { Fragment, useState, useRef, useEffect } from 'react';
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
import toast from 'util/toast';
//import debounce from 'util/debounce';
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
    enter: 350,
    exit: 500,
  },
  classNames: 'panel2',
};

const PlaylistPanel = slideHOC(Panel);

const AudioPlayer = ({ playlist, UserActions, auth, coins }) => {
  const [playlistVisible, setPlaylistVisibility] = useState(false);
  const [loading, setPending] = useState(false);

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

  }, []);

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
        trackStyle={{ backgroundColor: `${theme.colors.etGreen}` }}
        handleStyle={{
          borderColor: `${theme.colors.etGreen}`,
        }}
      />
    </div>
  );

  const next = () => {
    let [song] = playlist.filter((song) => song.id === currentSongId);

    if (playlist.length > 1 && song) {
      let current = playlist.indexOf(song);
      let last = playlist.length - 1;

      if (current === last) {
        let start = 0;
        return fetch(playlist[start].id);
      } else {
        let next = current + 1;
        return fetch(playlist[next].id);
      }
    }
  };

  const previous = () => {
    let [song] = playlist.filter((song) => song.id === currentSongId);

    if (playlist.length > 1 && song) {
      let current = playlist.indexOf(song);

      if (current === 0) {
        let last = playlist.length - 1;
        return fetch(playlist[last].id);
      } else {
        let prev = current - 1;
        return fetch(playlist[prev].id);
      }
    }
  };

  const fetch = async (id) => {
    setPending(true);

    if (playing && currentSongId === id) {
      setPlaying(false);
      setPending(false);
      audio.current.pause();
      return;
    }

    setCurrentSongId(id);

    try {
      let response = await axios({
        url: `/stream/${id}`,
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
            UserActions.getCoins(auth);
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

  const remove = (productId) => {
    UserActions.removeFromPlaylist(auth, productId);
  };

  return (
    <Fragment>
      <audio key='audio' ref={audio} type='audio/mpeg' />

      {isMobile ? (
        <>
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
            playlistVisible={playlistVisible}
            setPlaylistVisibility={setPlaylistVisibility}
            loading={loading}
          />

          <MobileNavigation
            playlistVisible={playlistVisible}
            setPaylistVisibility={setPlaylistVisibility}
          />
        </>
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
          loading={loading}
        />
      )}

      <PlaylistPanel
        in={playlistVisible}
        {...transProps}
        playlistVisible={playlistVisible}
        setPlaylistVisibility={setPlaylistVisibility}
        playlist={playlist}
        currentlyPlaying={currentSongId}
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
