import React, { Component } from 'react';
import axios from 'axios';
import { Box, Flex, Image, Stack, Input, Button, Text } from '@chakra-ui/react';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const ForgotContainer = styled(Flex)`
  ${FADE_IN}
`;

class ForgotPassword extends Component {
  state = {
    message: '',
    error: '',
    email: '',
  };

  reset = () => {
    return axios.post(
      '/api/v1/reset',
      {
        email: this.state.email,
      },
      { headers: { Accept: 'application/json' } },
    );
  };

  submit = async () => {
    let { data } = await this.reset();
    let { message, error } = data;
    this.setState({
      error: error,
      message: message,
    });
  };

  render() {
    return (
      <ForgotContainer w='100%' p={4} justify='center'>
        <Box w='300px'>
          <Flex direction='column' align='center'>
            <Image src='./favicon.ico' w='36px' />
          </Flex>

          <Stack spacing={4} my={4}>
            <Text color='teal'>
              Enter your user account's verified email address and we will send you a password reset link.
            </Text>

            <Input
              placeholder='Enter your email address'
              size='lg'
              name='email'
              type='text'
              onChange={(e) => {
                this.setState({
                  error: false,
                  message: '',
                  email: e.target.value,
                });
              }}
            />

            <Button bg='#28a745' variant='solid' w='100%' type='submit' onClick={this.submit}>
              Send password reset email
            </Button>
          </Stack>

          <Box color={this.state.error ? '#FF0000' : '#00FF00'}>{this.state.message}</Box>
        </Box>
      </ForgotContainer>
    );
  }
}
export default ForgotPassword;
