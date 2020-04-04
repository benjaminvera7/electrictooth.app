import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { Account, Cart, Home, Toll, Help } from 'components/Icons';
import { Box, Button, Flex } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import useRouter from 'hooks/useRouter';
import theme from 'theme.js';

const Navigation = ({ auth, cart, username }) => {
  const isMobile = useWindowSize();
  const router = useRouter();

  return (
    <div className='navigation'>
      <Flex maxW='1100px' flex='1'>
        {!isMobile && (
          <Fragment>
            <Link to='/'>
              <Box>
                <Button variant='link'>
                  <Home active={router.pathname === '/'} />
                </Button>
              </Box>
            </Link>
          </Fragment>
        )}

        <Link to='/help'>
          <Box>
            <Button variant='link'>
              <Help active={router.pathname === '/help'} />
            </Button>
          </Box>
        </Link>

        {!auth ? (
          <Link to='/signup'>
            <Box px={2}>
              <Button
                variant='link'
                color={
                  router.pathname === '/signup'
                    ? theme.colors.etGreen
                    : '#b3b3b3'
                }
              >
                sign up
              </Button>
            </Box>
          </Link>
        ) : (
          <>
            {' '}
            <Box mx='auto' />
            <Link to='/coins'>
              <Button
                leftIcon={Toll}
                bg={`${theme.colors.etGreen}`}
                variant='solid'
                size='xs'
                color='white'
                _hover={{
                  bg: `${theme.colors.etGreen}`,
                }}
                mx={1}
                mt='1px'
              >
                Get coins
              </Button>
            </Link>
            <Link to='/cart'>
              <Box style={{ position: 'relative' }} pl={2}>
                <Button variant='link'>
                  <Cart active={router.pathname === '/cart'} />
                </Button>

                <Box
                  style={{
                    position: 'absolute',
                    color: `${theme.colors.etGreen}`,
                    top: '-4px',
                    right: 0,
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {cart.items.length === 0 ? '' : cart.items.length}
                </Box>
              </Box>
            </Link>
            <Link to='/profile'>
              <Button variant='link' mx={1}>
                {auth ? (
                  <Flex
                    h='24px'
                    w='24px'
                    align='center'
                    justify='center'
                    //bg='#0FF4C6'
                    color={`${theme.colors.etGreen}`}
                    border='1px'
                    borderRadius='50%'
                  >
                    {username[0].toLowerCase()}
                  </Flex>
                ) : (
                  <Account />
                )}
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </div>
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
