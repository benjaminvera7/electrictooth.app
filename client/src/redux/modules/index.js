import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import user from './user';
import album from './album';
import web3 from './web3';

const modules = combineReducers({
  user,
  album,
  web3,
  pender,
});

export default modules;
