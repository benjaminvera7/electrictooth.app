import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import { logger } from 'redux-logger';

import modules from './modules';

const composeEnhancers = process.browser ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export default function configureStore() {
  const store = createStore(modules, composeEnhancers(applyMiddleware(penderMiddleware(), logger)));
  //const store = createStore(modules, composeEnhancers(applyMiddleware(penderMiddleware())));
  return { store };
}
