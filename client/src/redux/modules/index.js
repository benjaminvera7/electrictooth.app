import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import user from './user';
import web3 from './web3';
import products from './products';

const modules = combineReducers({
  user,
  products,
  web3,
  pender,
});

export default modules;
