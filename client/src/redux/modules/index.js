import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import user from './user';
import album from './album';
import player from './player';

const modules = combineReducers({
  user,
  player,
  album,
  pender,
});

export default modules;
