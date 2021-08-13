import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { Account, Cart, Home, Toll } from 'components/Icons';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import useRouter from 'hooks/useRouter';
import theme from 'theme.js';
import styled from '@emotion/styled';

const NavigationContainer = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  position: fixed;
  z-index: 2;
  background-color: #1d1d1d;
  height: 48px;
  width: 100%;
`;

const Navigation = ({ auth, cart, username }) => {
  const isMobile = useWindowSize();
  const router = useRouter();

  return (
    <NavigationContainer>
      <Flex maxW='900px' flex='1' alignItems="center" justifyContent="center">
        {(!isMobile || !auth) && (
          <Fragment>
            <Link to='/'>
              <Box>
                <Button variant='link' mx={4}>
                  <Home active={router.pathname === '/'} />
                </Button>
              </Box>
            </Link>
          </Fragment>
        )}

        {/* <Link to='/help'>
          <Box>
            <Button variant='link'>
              <Help active={router.pathname === '/help'} />
            </Button>
          </Box>
        </Link> */}

        {!auth ? (
          <>
            <Box mx='auto' />
            <Link to='/signup' >
              <Button
                bg={`${theme.colors.etBlack}`}
                border='1px solid white'
                size='xs'
                color='white'
                mx={4}
                mt='1px'
              >
                sign up
              </Button>
            </Link>
          </>
        ) : (
          <>
            {' '}
            <Flex direction='column' justifyContent='center' ml="8px">
              <Image src='./favicon.ico' w='28px' />
            </Flex>
            <Box mx='auto' />
            <Flex alignItems="center">
              <Link to='/coins'>
                <Button
                  variant='solid'
                  bg={`${theme.colors.etBlack}`}
                  size='xs'
                  color='white'
                  border='1px solid white'
                >
                  Get coins
                </Button>
              </Link>
              <Box mt='8px' ml='10px'>
                <Link to='/profile'>
                  <Button variant='link'>
                    {auth ? (
                      <Account active={router.pathname === '/profile'} />
                    ) : (
                      <Account />
                    )}
                  </Button>
                </Link>
              </Box>
              <Link to='/cart'>
                <Box style={{ position: 'relative' }}>
                  <Button variant='link' mt='4px' mr="8px">
                    <Cart active={router.pathname === '/cart'} />
                  </Button>
                  <Box
                    style={{
                      position: 'absolute',
                      color: `${theme.colors.etBlue}`,
                      top: '-2px',
                      right: '21px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {cart.items?.length === 0 ? 0 : cart.items?.length}
                  </Box>
                </Box>
              </Link>
            </Flex>

          </>
        )}
      </Flex>
    </NavigationContainer >
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    cart: state.user.cart,
    username: state.user.username,
    errorMessage: state.user.errorMessage,
    user: state.user,
    updatedAt: state.user.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Navigation);
