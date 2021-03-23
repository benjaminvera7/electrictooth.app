import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
//import { ThemeProvider, theme } from '@chakra-ui/core';
import { ThemeProvider } from '@chakra-ui/core';

import configureStore from 'redux/configureStore';
import axios from 'axios';
import App from './App';
import '../src/app.css';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const { store } = configureStore();
const history = createBrowserHistory();

// const etTheme = {
//   colors: {
//     ...theme.colors,
//     etGreen: '#05AEA5',
//     etGrey: '#94999E',
//     etWhite: '#ECEFED',
//   },
// };

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Router history={history}>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
