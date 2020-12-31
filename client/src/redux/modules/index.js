import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import user from './user';
import web3 from './web3';
import music from './music';

const modules = combineReducers({
  user,
  music,
  web3,
  pender,
});

export default modules;
