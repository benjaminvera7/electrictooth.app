import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import {
  Box,
  Flex,
  Stack,
  Input,
  Button,
  Link,
  Text,
} from '@chakra-ui/react';
import theme from 'theme.js';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const SigninContainer = styled(Flex)`
  ${FADE_IN}
`;

const Signin = ({ UserActions, history, error, message }) => {
  let form;

  return (
    <SigninContainer w='100%' justify='center' mt="64px" backgroundColor={`${theme.colors.etBlack}`}>
      <Box w='300px'>
        {/* <Flex direction='column' align='center'>
          <Image src='./favicon.ico' w='36px' />
        </Flex> */}

        <form
          ref={(r) => (form = r)}
          method='POST'
          onSubmit={(e) => {
            e.preventDefault();
            UserActions.signIn({
              email: form.email.value,
              password: form.password.value,
            }).then(() => {
              history.push('/');
            });
          }}
        >
          <Stack spacing={4} my={4}>
            <Input height='41px' placeholder='Email' size='lg' name='email' type='text' backgroundColor="#2d2d2d" border="none" color="white" />
            <Input
              placeholder='Password'
              size='lg'
              name='password'
              type='password'
              backgroundColor="#2d2d2d" border="none"
              height='41px'
              color="white"
            />

            <Button
              bg={`${theme.colors.etBlue}`}
              color='black'
              variant='solid'
              height='41px'
              w='100%'
              type='submit'
              _hover={{
                bg: `${theme.colors.etBlue}`,
              }}
            >
              Log in
            </Button>
          </Stack>
        </form>

        <Box
          w='100%'
          type='submit'
          mt={4}
          textAlign='center'
          backgroundColor="#2d2d2d" border="none"
          borderRadius='md'
          height='41px'
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box fontSize='xs' py={2} color='black'>
            <span>
              <span style={{ color: 'white' }}>New to Electric Tooth?</span>
              <Link
                onClick={() => history.push('/signup')}
                style={{ color: theme.colors.etBlue }}
                px={2}
              >
                Create an account.
              </Link>
            </span>
          </Box>
        </Box>

        <Box w='100%' type='submit' mt={4} textAlign='center' borderRadius='md'>
          <Box fontSize='xs' py={2} color='white'>
            <span>
              <Link
                onClick={() => history.push('/forgot')}
                style={{ color: theme.colors.etBlue }}
              >
                Forgot Password?
              </Link>
            </span>
          </Box>
        </Box>

        {error && (
          <Flex justify='center' py={4}>
            <Text color='#ff0000'>{message}</Text>
          </Flex>
        )}
      </Box>
    </SigninContainer>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    message: state.user.message,
    error: state.user.error,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Signin);
