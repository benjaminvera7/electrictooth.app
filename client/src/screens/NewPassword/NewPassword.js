import React, { Component } from 'react';
import { Box, Flex, Image, Stack, Input, Button } from '@chakra-ui/react';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import axios from 'axios';
import theme from 'theme.js';


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
      `/api/v1/reset/${userId}/${token}`,
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
    console.log(data)


    if (!this.state.error) {
      this.setState({
        error: error,
        message: message,
      });
    }
  };

  render() {
    return (
      <ForgotContainer w='100%' p={4} justify='center' mt='40px' backgroundColor={theme.colors.etBlack}>
        <Box w='300px'>
          <Flex direction='column' align='center'>
            <Image src='./favicon.ico' w='36px' />
          </Flex>

          <Stack spacing={4} my={4}>
            <Input
              color='white'
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
              color='white'
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

            <Button bg={theme.colors.etBlue} variant='solid' w='100%' type='submit' onClick={this.submit} color="black">
              Reset Password
            </Button>

            <Flex justify='center' flexDirection='column' alignItems='center'>
              <Box color={this.state.error ? 'red' : 'green'}>{this.state.message}</Box>
              {(!this.state.error && this.state.message !== '') && <Box color='white'>Please sign in <a href='https://electrictooth.com/signin' style={{ color: theme.colors.etBlue }}>here</a></Box>}
            </Flex>

          </Stack>
        </Box>
      </ForgotContainer>
    );
  }
}
export default NewPassword;
