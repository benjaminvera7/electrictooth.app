import axios from 'axios';
import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

function getDate() {
  let utcDate = new Date(Date.now());
  return utcDate.toUTCString();
}

const _addSongToPlaylist = (token, songId) => {
  return axios({
    url: `${process.env.REACT_APP_API_URL}/song/${songId}`,
    method: 'GET',
    headers: { Authorization: token },
  });
};

export const ADD_SONG_TO_PLAYLIST = 'player/ADD_SONG_TO_PLAYLIST';
export const addSongToPlaylist = createAction(
  ADD_SONG_TO_PLAYLIST,
  _addSongToPlaylist,
);

const _addAlbumToPlaylist = (token, albumId) => {
  return axios({
    url: `/albums/album/${albumId}`,
    method: 'GET',
    headers: { Authorization: token },
  });
};

export const ADD_ALBUM_TO_PLAYLIST = 'player/ADD_ALBUM_TO_PLAYLIST';
export const addAlbumToPlaylist = createAction(
  ADD_ALBUM_TO_PLAYLIST,
  _addAlbumToPlaylist,
);

export const REMOVE_SONG = 'player/REMOVE_SONG';
export const removeSong = createAction(REMOVE_SONG);

const initialState = {
  playlist: [],
  error: null,
  updatedAt: getDate(),
};

export default handleActions(
  {
    ...pender({
      type: ADD_ALBUM_TO_PLAYLIST,
      onSuccess: (state, { payload }) => {
        const newState = {
          ...state,
          updatedAt: getDate(),
          error: null,
        };

        let songs = payload.data.album.songs;

        songs.map((song) => {
          let newSong = {
            id: song._id,
            song_name: song.song_name,
            artist_name: song.artist_name,
            art_url: song.art_url,
          };

          //checks and sees if songs are already in playlist...should probably move this somewhere else
          //to prevent api call.

          let exists = _.find(state.playlist, { id: newSong.id });

          if (exists) {
            return newState.playlist;
          }

          return newState.playlist.push(newSong);
        });

        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
    ...pender({
      type: ADD_SONG_TO_PLAYLIST,
      onSuccess: (state, { payload }) => {
        const newState = {
          ...state,
          updatedAt: getDate(),
          error: null,
        };

        let song = payload.data.song;

        let newSong = {
          id: song._id,
          song_name: song.song_name,
          artist_name: song.artist_name,
          art_url: song.art_url,
        };

        //checks and sees if songs are already in playlist...should probably move this somewhere else
        //to prevent api call.

        let exists = _.find(state.playlist, { id: newSong.id });
        console.log(exists);

        if (exists) {
          return state;
        }

        newState.playlist.push(newSong);

        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
    [REMOVE_SONG]: (state, { payload }) => {
      const newState = { ...state, updatedAt: getDate(), error: null };

      const newPlaylist = state.playlist.filter((song) => song.id !== payload);

      newState.playlist = newPlaylist;

      return newState;
    },
  },
  initialState,
);
