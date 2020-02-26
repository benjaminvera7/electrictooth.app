import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import user from './user';
import album from './album';

const modules = combineReducers({
  user,
  album,
  pender,
});

export default modules;
