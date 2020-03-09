import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Input,
  Button,
  Image,
  Link,
  Text,
} from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const SignupContainer = styled(Flex)`
  ${FADE_IN}
`;

const Signup = ({ UserActions, history, error, message }) => {
  let form;

  return (
    <SignupContainer w='100%' p={4} justify='center'>
      <Box w='300px'>
        <Flex direction='column' align='center'>
          <Image src='./favicon.ico' w='36px' />
        </Flex>

        <form
          ref={(r) => (form = r)}
          method='POST'
          onSubmit={(e) => {
            e.preventDefault();
            UserActions.signUp({
              username: form.username.value,
              email: form.email.value,
              password: form.password.value,
            }).then(() => history.push('/'));
          }}
        >
          <Stack spacing={4} my={4}>
            <Input
              placeholder='Username'
              size='lg'
              name='username'
              type='text'
              maxlength='15'
            />
            <Input
              placeholder='Email address'
              size='lg'
              name='email'
              type='email'
            />
            <Input
              placeholder='Password'
              size='lg'
              name='password'
              type='password'
            />

            <Button bg='#6eacdd' variant='solid' w='100%' type='submit'>
              Sign up
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
          <Box fontSize='xs' py={2} color='white'>
            <span>
              Already have an account?{' '}
              <Link
                onClick={() => history.push('/signin')}
                style={{ color: '#6eacdd' }}
              >
                Log in.
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
    </SignupContainer>
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
)(Signup);
