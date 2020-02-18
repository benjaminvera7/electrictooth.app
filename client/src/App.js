import React, { useEffect } from 'react';
import { CSSReset } from '@chakra-ui/core';
import { Box } from '@chakra-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from 'screens/Home';
import Download from 'screens/Download';
import Checkout from 'screens/Checkout';
import Cart from 'screens/Cart';
import Profile from 'screens/Profile';
import Catalog from 'screens/Catalog';
import Coins from 'screens/Coins';
import Signin from 'screens/Signin';
import Signup from 'screens/Signup';
import Album from 'screens/Album';
import Navigation from 'components/Navigation';
import AudioPlayer from 'components/AudioPlayer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import * as userActions from 'redux/modules/user';

function App({ AlbumActions, UserActions, auth }) {
  //def need to refactor into hook or something
  useEffect(() => {
    AlbumActions.getAlbums();
    auth && UserActions.getUser(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <CSSReset />

      <Navigation />

      <Box mb='100px'>
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
          <Route path='/catalog/:id' component={Album} />
          <Route path='/catalog' component={Catalog} />
          <Route path='/profile' component={Profile} />
          <Route path='/cart' component={Cart} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/download/:orderId' component={Download} />
          <Route path='/coins' component={Coins} />
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </Box>

      <AudioPlayer />
    </main>
  );
}

export default connect(
  (state) => ({
    albums: state.album.albums,
    auth: state.user.authenticated,
    updatedAt: state.album.updatedAt,
    error: state.pender.failure['album/GET_ALBUMS'],
  }),
  (dispatch) => ({
    AlbumActions: bindActionCreators(albumActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(App);
