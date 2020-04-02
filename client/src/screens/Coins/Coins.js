import React from 'react';
import { Box, Flex, Text, Heading, Stack } from '@chakra-ui/core';
import { Toll } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import useRouter from 'hooks/useRouter';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import toast from 'util/toast';
import theme from 'theme.js';

const CoinContainer = styled(Flex)`
  ${FADE_IN}
`;

const Coins = ({ UserActions, auth }) => {
  const router = useRouter();

  const addToCart = (coins) => {
    if (auth) {
      UserActions.addToCart(coins, auth);
      toast(`Added to your Cart`);
    } else {
      router.push('/signup');
    }
  };

  return (
    <CoinContainer justify='center'>
      <Box color='white' maxW='1100px' flex='1'>
        <Heading
          px={4}
          pt={2}
          as='h2'
          size='2xl'
          color={`${theme.colors.etGreen}`}
        >
          coins
        </Heading>

        <Text px={4} fontSize='sm' mb={4} color='grey'>
          $0.01 USD = 1 coin = 1 stream. 100% goes to the artists!
        </Text>

        <Flex direction='column' align='center'>
          <Flex h='170px' w='600px' bg='white'>
            <Box flex='1' color='black'>
              1
            </Box>
            <Box flex='3' color='black'>
              2
            </Box>
          </Flex>
        </Flex>
      </Box>
    </CoinContainer>
  );
};

/*
        <Stack>
          <Flex py={2} px={4} mx={2} justify='space-between' align='center'>
            <Flex align='center'>
              <Box px={2}>
                <Toll />
              </Box>
              <Text color={`${theme.colors.etGreen}`}>100</Text>
            </Flex>

            <Box
              as='button'
              rounded='md'
              bg={`${theme.colors.etGreen}`}
              color='white'
              px={4}
              h={8}
              onClick={() => addToCart('coin100')}
            >
              $1.00
            </Box>
          </Flex>

          <Flex py={2} px={4} mx={2} justify='space-between' align='center'>
            <Flex align='center'>
              <Box px={2}>
                <Toll />
              </Box>
              <Text color={`${theme.colors.etGreen}`}>200</Text>
            </Flex>

            <Box
              as='button'
              rounded='md'
              bg={`${theme.colors.etGreen}`}
              color='white'
              px={4}
              h={8}
              onClick={() => addToCart('coin200')}
            >
              $2.00
            </Box>
          </Flex>

          <Flex py={2} px={4} mx={2} justify='space-between' align='center'>
            <Flex align='center'>
              <Box px={2}>
                <Toll />
              </Box>
              <Text color={`${theme.colors.etGreen}`}>300</Text>
            </Flex>

            <Box
              as='button'
              rounded='md'
              bg={`${theme.colors.etGreen}`}
              color='white'
              px={4}
              h={8}
              onClick={() => addToCart('coin300')}
            >
              $3.00
            </Box>
          </Flex>
        </Stack>
*/

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
