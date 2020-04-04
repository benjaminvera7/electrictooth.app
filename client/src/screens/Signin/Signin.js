import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import {
  Box,
  Flex,
  Image,
  Stack,
  Input,
  Button,
  Link,
  Text,
} from '@chakra-ui/core';
import theme from 'theme.js';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const SigninContainer = styled(Flex)`
  ${FADE_IN}
`;

const Signin = ({ UserActions, history, error, message }) => {
  let form;

  return (
    <SigninContainer w='100%' p={4} justify='center'>
      <Box w='300px'>
        <Flex direction='column' align='center'>
          <Image src='./favicon.ico' w='36px' />
        </Flex>

        <form
          ref={(r) => (form = r)}
          method='POST'
          onSubmit={(e) => {
            e.preventDefault();
            UserActions.signIn({
              email: form.email.value,
              password: form.password.value,
            }).then(() => history.push('/profile'));
          }}
        >
          <Stack spacing={4} my={4}>
            <Input placeholder='Email' size='lg' name='email' type='text' />
            <Input
              placeholder='Password'
              size='lg'
              name='password'
              type='password'
            />

            <Button
              bg={`${theme.colors.etGreen}`}
              color='white'
              variant='solid'
              w='100%'
              type='submit'
              _hover={{
                bg: `${theme.colors.etGreen}`,
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
          border='1px solid #d8dee2'
          borderRadius='md'
        >
          <Box fontSize='xs' py={2} color='black'>
            <span>
              New to Electric Tooth?{' '}
              <Link
                onClick={() => history.push('/signup')}
                style={{ color: theme.colors.etGreen }}
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
                style={{ color: theme.colors.etGreen }}
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
