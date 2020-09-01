import React, { useEffect } from 'react';
import { CSSReset } from '@chakra-ui/core';
import { Box } from '@chakra-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from 'screens/Home';
import Download from 'screens/Download';
import Checkout from 'screens/Checkout';
import Cart from 'screens/Cart';
import Profile from 'screens/Profile';
import Help from 'screens/Help';
import Coins from 'screens/Coins';
import Signin from 'screens/Signin';
import Signup from 'screens/Signup';
import Album from 'screens/Album';
import ForgotPassword from 'screens/ForgotPassword';
import NewPassword from 'screens/NewPassword';
import Navigation from 'components/Navigation';
import AudioPlayer from 'components/AudioPlayer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productsActions from 'redux/modules/products';
import * as userActions from 'redux/modules/user';

function App({ ProductsActions, UserActions, auth, playlist }) {
  //def need to refactor into hook or something
  useEffect(() => {
    ProductsActions.getAlbums();
    auth && UserActions.getUser(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CSSReset />

      <Navigation />

      <Box mb='100px'>
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
          <Route path='/help' component={Help} />
          <Route path='/forgot' component={ForgotPassword} />
          <Route path='/reset/:userId/:token' component={NewPassword} />
          <Route path='/catalog/:productId' component={Album} />
          <Route path='/profile' component={Profile} />
          <Route path='/cart' component={Cart} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/download/:orderId' component={Download} />
          <Route path='/coins' component={Coins} />
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </Box>

      <div id='snackbar'></div>

      {auth && <AudioPlayer />}
    </>
  );
}

export default connect(
  (state) => ({
    albums: state.products.albums,
    auth: state.user.authenticated,
    playlist: state.user.playlist,
    updatedAt: state.products.updatedAt,
    error: state.pender.failure['products/GET_ALBUMS'],
  }),
  (dispatch) => ({
    ProductsActions: bindActionCreators(productsActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(App);
