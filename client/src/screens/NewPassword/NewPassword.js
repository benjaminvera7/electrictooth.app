import React, { Component, Fragment } from 'react';
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

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import axios from 'axios';

const ForgotContainer = styled(Flex)`
  ${FADE_IN}
`;

class NewPassword extends Component {
  state = {
    password: '',
    passwordConfirm: '',
    error: '',
    message: '',
  };

  reset = (password, passwordConfirm, userId, token) => {
    return axios.post(
      `/reset/${userId}/${token}`,
      {
        password: password,
        passwordConfirm: passwordConfirm,
      },
      { headers: { Accept: 'application/json' } },
    );
  };

  submit = async () => {
    const { password, passwordConfirm } = this.state;
    const { match, history } = this.props;

    if (password !== passwordConfirm || password === '') {
      this.setState({ error: true, message: 'Passwords do not match' });
      return;
    }

    let userId = match.params.userId;
    let token = match.params.token;

    let { data } = await this.reset(password, passwordConfirm, userId, token);
    let { message, error } = data;
    this.setState({
      error: error,
      message: message,
    });

    if (!this.state.error) {
      history.push('/signin');
    }
  };

  render() {
    return (
      <ForgotContainer w='100%' p={4} justify='center'>
        <Box w='300px'>
          <Flex direction='column' align='center'>
            <Image src='./favicon.ico' w='36px' />
          </Flex>

          <Stack spacing={4} my={4}>
            <Input
              placeholder='New Password'
              size='lg'
              name='password'
              type='password'
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                  message: '',
                  error: false,
                });
              }}
            />

            <Input
              placeholder='Confirm Password'
              size='lg'
              name='passwordConfirm'
              type='password'
              onChange={(e) => {
                this.setState({
                  passwordConfirm: e.target.value,
                  message: '',
                  error: false,
                });
              }}
            />

            <Button
              bg='#28a745'
              variant='solid'
              w='100%'
              type='submit'
              onClick={this.submit}
            >
              Reset Password
            </Button>

            <Box color='#DC143C'>{this.state.message}</Box>
          </Stack>
        </Box>
      </ForgotContainer>
    );
  }
}
export default NewPassword;
