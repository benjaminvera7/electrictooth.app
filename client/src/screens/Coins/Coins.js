import React from 'react';
import { Box, Flex, Text, Heading, Stack } from '@chakra-ui/core';
import { Toll } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { useToast } from '@chakra-ui/core';
import useRouter from 'hooks/useRouter';

import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const CoinContainer = styled(Flex)`
  ${FADE_IN}
`;

const Coins = ({ UserActions, auth }) => {
  const toast = useToast();
  const router = useRouter();

  const addToCart = (coins) => {
    if (auth) {
      UserActions.addToCart(coins, auth);

      // toast({
      //   position: 'top',
      //   title: 'Cart updated.',
      //   description: `${coins.substring(4, 7)} coins added.`,
      //   status: 'success',
      //   duration: 3000,
      //   isClosable: true,
      // });
    } else {
      router.push('/signup');
    }
  };

  return (
    <CoinContainer justify='center'>
      <Box color='white' maxW='1100px' flex='1'>
        <Heading px={4} pt={2} as='h2' size='2xl'>
          coins
        </Heading>

        <Text px={4} fontSize='sm' mb={4} color='grey'>
          $0.01 USD = 1 coin = 1 stream. 100% goes to the artists!
        </Text>

        <Stack>
          <Flex
            py={2}
            px={4}
            mx={2}
            justify='space-between'
            align='center'
            borderWidth='1px'
            rounded='lg'
          >
            <Flex align='center'>
              <Box px={2}>
                <Toll />
              </Box>
              100
            </Flex>

            <Box
              as='button'
              rounded='md'
              bg='#2d7bb8'
              color='white'
              px={4}
              h={8}
              onClick={() => addToCart('coin100')}
            >
              $1.00
            </Box>
          </Flex>

          <Flex
            py={2}
            px={4}
            mx={2}
            justify='space-between'
            align='center'
            borderWidth='1px'
            rounded='lg'
          >
            <Flex align='center'>
              <Box px={2}>
                <Toll />
              </Box>
              200
            </Flex>

            <Box
              as='button'
              rounded='md'
              bg='#2d7bb8'
              color='white'
              px={4}
              h={8}
              onClick={() => addToCart('coin200')}
            >
              $2.00
            </Box>
          </Flex>

          <Flex
            py={2}
            px={4}
            mx={2}
            justify='space-between'
            align='center'
            borderWidth='1px'
            rounded='lg'
          >
            <Flex align='center'>
              <Box px={2}>
                <Toll />
              </Box>
              300
            </Flex>

            <Box
              as='button'
              rounded='md'
              bg='#2d7bb8'
              color='white'
              px={4}
              h={8}
              onClick={() => addToCart('coin300')}
            >
              $3.00
            </Box>
          </Flex>
        </Stack>
      </Box>
    </CoinContainer>
  );
};

export default connect(
  (state) => ({
    user: state.user,
    auth: state.user.authenticated,
    updatedAt: state.album.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Coins);
