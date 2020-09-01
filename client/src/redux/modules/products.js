import axios from 'axios';
import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';

function getDate() {
  let utcDate = new Date(Date.now());
  return utcDate.toUTCString();
}

const _getAlbums = () => {
  return axios({
    url: `/api/v1/products/albums`,
    method: 'GET',
  });
};

const _getAlbumById = (productId) => {
  return axios({
    url: `/api/v1/products/albums/${productId}`,
    method: 'GET',
  });
};

export const GET_ALBUMS = 'products/GET_ALBUMS';
export const getAlbums = createAction(GET_ALBUMS, _getAlbums);

export const GET_ALBUM_BY_ID = 'products/GET_ALBUM_BY_ID';
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
        const album = payload.data;
        const songs = album.filter((p) => p.position !== undefined);
        const [currentAlbum] = album.filter((p) => p.position === undefined);
        currentAlbum.songs = songs;
        newState.currentAlbum = currentAlbum;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
  },
  initialState,
);
