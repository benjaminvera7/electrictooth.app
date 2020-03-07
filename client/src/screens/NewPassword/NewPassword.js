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

const ForgotContainer = styled(Flex)`
  ${FADE_IN}
`;

class NewPassword extends Component {
  render() {
    return (
      <ForgotContainer w='100%' p={4} justify='center'>
        <Box w='300px'>
          <Flex direction='column' align='center'>
            <Image src='./favicon.ico' w='36px' />
          </Flex>

          <Stack spacing={4} my={4}>
            <Text color='white'>
              Enter your user account's verified email address and we will send
              you a password reset link.
            </Text>

            <Input
              placeholder='Enter your email address'
              size='lg'
              name='email'
              type='text'
            />

            <Button bg='#28a745' variant='solid' w='100%' type='submit'>
              Send password reset email
            </Button>
          </Stack>
        </Box>
      </ForgotContainer>
    );
  }
}
export default NewPassword;
