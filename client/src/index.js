import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import configureStore from 'redux/configureStore';
import axios from 'axios';
import App from './App';
import '../src/app.css';

import './fonts/Spotify-Bold.woff2';
import './fonts/Spotify-Light.woff2';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const { store } = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <Router history={history}>
        <App />
      </Router>
    </ChakraProvider>
  </Provider>,
  document.getElementById('root'),
);