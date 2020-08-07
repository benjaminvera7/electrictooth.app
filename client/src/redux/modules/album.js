import axios from 'axios';
import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';

function getDate() {
  let utcDate = new Date(Date.now());
  return utcDate.toUTCString();
}

const _getAlbums = (page) => {
  return axios({
    url: `/albums/${page ? page : '1'}`,
    method: 'GET',
  });
};

const _getAlbumById = (productId) => {
  return axios({
    url: `/albums/album/${productId}`,
    method: 'GET',
  });
};

export const GET_ALBUMS = 'album/GET_ALBUMS';
export const getAlbums = createAction(GET_ALBUMS, _getAlbums);

export const GET_ALBUM_BY_ID = 'album/GET_ALBUM_BY_ID';
export const getAlbumById = createAction(GET_ALBUM_BY_ID, _getAlbumById);

const initialState = {
  albums: [],
  currentAlbum: {
    songs: [],
  },
  updatedAt: getDate(),
};

export default handleActions(
  {
    ...pender({
      type: GET_ALBUMS,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.albums = payload.data;
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
        newState.currentAlbum = payload.data;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
  },
  initialState,
);
