import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { Account, Cart, Home, Toll } from 'components/Icons';
import { Box, Button, Flex, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import useRouter from 'hooks/useRouter';

const Navigation = ({ auth, cart, username }) => {
  const isMobile = useWindowSize();
  const router = useRouter();

  return (
    <div className='navigation'>
      <Flex maxW='1100px' flex='1'>
        {!isMobile && (
          <Fragment>
            <Link to='/'>
              <Box px={2}>
                <Button variant='link'>
                  <Home active={router.pathname === '/'} />
                </Button>
              </Box>
            </Link>
          </Fragment>
        )}

        <Link to='/coins'>
          <Box>
            <Button
              leftIcon={Toll}
              variantColor='teal'
              variant='outline'
              size='xs'
              color='white'
              _hover={{ bg: '#2d7bb8' }}
              mx={2}
              mt='1px'
            >
              Get coins
            </Button>
          </Box>
        </Link>

        <Box mx='auto' />

        {!auth && (
          <Link to='/signup'>
            <Box px={3}>
              <Button
                variant='link'
                color={router.pathname === '/signup' ? '#2a69ac' : '#b3b3b3'}
              >
                sign up
              </Button>
            </Box>
          </Link>
        )}

        <Link to='/cart'>
          <Box style={{ position: 'relative' }}>
            <Button variant='link'>
              <Cart active={router.pathname === '/cart'} />
            </Button>

            <Box
              style={{
                position: 'absolute',
                color: 'yellow',
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
                bg='#0FF4C6'
                color='#0e0e10'
                borderRadius='50%'
              >
                {username[0]}
              </Flex>
            ) : (
              <Account />
            )}
          </Button>
        </Link>
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
    updatedAt: state.user.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Navigation);
