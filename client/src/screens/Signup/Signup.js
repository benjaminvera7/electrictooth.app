import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Input,
  Button,
  Link,
  Text,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import theme from 'theme.js';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const SignupContainer = styled(Flex)`
  ${FADE_IN}
`;

const Signup = ({ UserActions, history, error, message }) => {
  let form;

  return (
    <SignupContainer w='100%' justify='center' mt="64px" backgroundColor={`${theme.colors.etBlack}`}>
      <Box w='300px'>
        {/* <Flex direction='column' align='center'>
          <Image src='./favicon.ico' w='36px' />
        </Flex> */}

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
              backgroundColor="#2d2d2d" border="none"
              height='41px'
              color="white"
            />
            <Input
              placeholder='Email address'
              size='lg'
              name='email'
              type='email'
              backgroundColor="#2d2d2d" border="none"
              height='41px'
              color="white"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
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
              w='100%'
              type='submit'
              _hover={{
                bg: `${theme.colors.etBlue}`,
              }}
              height='41px'
            >
              Sign up
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
              <span style={{ color: 'white' }}>Already have an account?</span>
              <Link
                onClick={() => history.push('/signin')}
                style={{ color: theme.colors.etBlue, paddingLeft: '8px' }}
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
