import axios from 'axios';
import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';

function getDate() {
  let utcDate = new Date(Date.now());
  return utcDate.toUTCString();
}

const _getAlbums = () => {
  return axios({
    url: `/api/v1/music`,
    method: 'GET',
  });
};

const _getAlbumById = (productId) => {
  return axios({
    url: `/api/v1/music/${productId}`,
    method: 'GET',
  });
};

export const GET_ALBUMS = 'music/GET_ALBUMS';
export const getAlbums = createAction(GET_ALBUMS, _getAlbums);

export const GET_ALBUM_BY_ID = 'music/GET_ALBUM_BY_ID';
export const getAlbumById = createAction(GET_ALBUM_BY_ID, _getAlbumById);

const initialState = {
  albums: [],
  artists: [],
  coins: [],
  products: [],
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
        newState.artists = payload.data.artists;
        newState.coins = payload.data.coins;
        newState.products = payload.data.products;

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
