import axios from 'axios';
import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';

function getDate() {
  let utcDate = new Date(Date.now());
  return utcDate.toUTCString();
}

const _getUser = (token) => {
  return axios({
    url: '/user',
    method: 'GET',
    headers: { Authorization: token },
  });
};

const _signup = (credentials) => {
  return axios.post('/auth/signup', credentials);
};

const _signin = (credentials) => {
  return axios.post('/auth/signin', credentials);
};

const _addToCart = (product_id, token) => {
  return axios({
    url: `/user/cart/add/${product_id}`,
    method: 'POST',
    headers: { Authorization: token },
  });
};

const _removeFromCart = (product_id, token) => {
  return axios({
    url: `/user/cart/remove/${product_id}`,
    method: 'POST',
    headers: { Authorization: token },
  });
};

const _checkout = (token) => {
  return axios({
    url: `/paypal/request`,
    method: 'POST',
    headers: {
      Authorization: token,
    },
  });
};

// const _checkout = (token) => {
//   return fetch(`${process.env.REACT_APP_API_URL}/paypal/request`, {
//     method: 'POST',
//     headers: new Headers({
//       Authorization: token,
//     }),
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     Origin: '',
//     Host: `${process.env.REACT_APP_API_URL}`,
//   });
// };

const _getCoins = (token) => {
  return axios({
    url: `/user/coins`,
    method: 'GET',
    headers: { Authorization: token },
  });
};

const _exchangeCoins = (token, type, amount) => {
  return axios({
    url: `/user/coins/exchange`,
    method: 'POST',
    data: {
      type: type,
      amount: amount,
    },
    headers: { Authorization: token },
  });
};

export const GET_COINS = 'user/GET_COINS';
export const getCoins = createAction(GET_COINS, _getCoins);

export const EXCHANGE_COINS = 'user/EXCHANGE_COINS';
export const exchangeCoins = createAction(EXCHANGE_COINS, _exchangeCoins);

export const GET_USER = 'user/GET_USER';
export const getUser = createAction(GET_USER, _getUser);

export const SIGN_UP = 'user/SIGN_UP';
export const signUp = createAction(SIGN_UP, _signup);

export const SIGN_IN = 'user/SIGN_IN';
export const signIn = createAction(SIGN_IN, _signin);

export const ADD_TO_CART = 'user/ADD_TO_CART';
export const addToCart = createAction(ADD_TO_CART, _addToCart);

export const USER_CHECKOUT = 'user/USER_CHECKOUT';
export const checkout = createAction(USER_CHECKOUT, _checkout);

export const REMOVE_FROM_CART = 'user/REMOVE_FROM_CART';
export const removeFromCart = createAction(REMOVE_FROM_CART, _removeFromCart);

export const SIGN_OUT = 'user/SIGN_OUT';
export const signOut = createAction(SIGN_OUT);

//TODO SEND USER_ID SET IN STORAGE

const initialState = {
  userId: localStorage.getItem('userId'),
  authenticated: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  albumCollection: [],
  cart: {
    items: [],
    total: 0,
  },
  coins: 0,
  showModal: false,
  updatedAt: getDate(),
  error: '',
};

export default handleActions(
  {
    ...pender({
      type: GET_USER,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.albumCollection = payload.data.user.albumCollection;
        newState.coins = payload.data.user.coins;
        newState.username = payload.data.user.username;
        newState.cart = payload.data.user.cart;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: 'bad' };
      },
    }),
    ...pender({
      type: SIGN_UP,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        localStorage.setItem('token', payload.data.token);
        localStorage.setItem('userId', payload.data.userId);
        localStorage.setItem('username', payload.data.username);
        newState.authenticated = payload.data.token;
        newState.userId = payload.data.userId;
        newState.albumCollection = payload.data.albumCollection;
        newState.cart = payload.data.cart;
        newState.coins = payload.data.coins;
        newState.username = payload.data.username;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload.response.data.error };
      },
    }),
    ...pender({
      type: SIGN_IN,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        console.log(payload);
        localStorage.setItem('token', payload.data.token);
        localStorage.setItem('userId', payload.data.userId);
        localStorage.setItem('username', payload.data.username);
        newState.userId = payload.data.userId;
        newState.authenticated = payload.data.token;
        newState.albumCollection = payload.data.albumCollection;
        newState.cart = payload.data.cart;
        newState.coins = payload.data.coins;
        newState.username = payload.data.username;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload.response.data.error };
      },
    }),
    ...pender({
      type: ADD_TO_CART,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.cart = payload.data.user.cart;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload.response.data.error };
      },
    }),
    ...pender({
      type: REMOVE_FROM_CART,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.cart = payload.data.user.cart;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload.response.data.error };
      },
    }),
    ...pender({
      type: USER_CHECKOUT,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        console.log(payload);
        //newState.cart = payload.data.user.cart;
        return newState;
      },
      onFailure: (state, res) => {
        return { ...state, error: res };
      },
    }),
    ...pender({
      type: GET_COINS,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.coins = payload.data.coins;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload.response.data.error };
      },
    }),
    ...pender({
      type: EXCHANGE_COINS,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        localStorage.setItem('coins', payload.data.coins);
        newState.coins = payload.data.coins;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload.response.data.error };
      },
    }),
    [SIGN_OUT]: (state) => {
      const newState = { ...initialState, updatedAt: getDate(), error: null };
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      return newState;
    },
  },
  initialState,
);
