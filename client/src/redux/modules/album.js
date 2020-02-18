import axios from 'axios';
import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';

function getDate() {
  let utcDate = new Date(Date.now());
  return utcDate.toUTCString();
}

const _getAlbums = (page) => {
  return axios({
    url: `${process.env.REACT_APP_API_URL}/albums/${page ? page : '1'}`,
    method: 'GET',
  });
};

const _getAlbumById = (albumId) => {
  return axios({
    url: `${process.env.REACT_APP_API_URL}/albums/album/${albumId}`,
    method: 'GET',
  });
};

export const GET_ALBUMS = 'album/GET_ALBUMS';
export const getAlbums = createAction(GET_ALBUMS, _getAlbums);

export const GET_ALBUM_BY_ID = 'album/GET_ALBUM_BY_ID';
export const getAlbumById = createAction(GET_ALBUM_BY_ID, _getAlbumById);

const initialState = {
  albums: [],
  currentAlbum: {},
  updatedAt: getDate(),
};

export default handleActions(
  {
    ...pender({
      type: GET_ALBUMS,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.albums = payload.data.albums;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
    ...pender({
      type: GET_ALBUM_BY_ID,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.currentAlbum = payload.data.album;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
  },
  initialState,
);
