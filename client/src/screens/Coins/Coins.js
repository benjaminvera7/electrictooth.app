import React from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Stack,
  Image,
  Button,
  Link,
} from '@chakra-ui/core';
import { Toll } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import useRouter from 'hooks/useRouter';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import toast from 'util/toast';
import theme from 'theme.js';

const CoinContainer = styled(Box)`
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
    <>
      <CoinContainer maxWidth='1100px' m='auto' px={4} pb={4}>
        <Heading pt={2} as='h2' size='2xl' color={`${theme.colors.etGreen}`}>
          coins
        </Heading>

        <Text fontSize='sm' mb={4} color='grey'>
          $0.01 USD = 1 coin = 1 stream. 100% goes to the artists!
        </Text>

        {/* 100 */}
        <Flex
          maxWidth='768px'
          m='auto'
          align='center'
          style={{ textAlign: 'center' }}
          borderWidth='1px'
          mb={4}
          mt={8}
          bg='white'
        >
          <Image
            src={`/uploads/coin100.png`}
            maxWidth={{ xs: '0px', sm: '175px' }}
          />

          <Box display={{ md: 'flex' }} width='100%' px={2}>
            <Flex align='center' justify='center'>
              <Box px={2}>
                <Toll width='40px' height='40px' />
              </Box>

              <Box width={{ md: '100%' }}>
                <Box fontSize='40px' color={`${theme.colors.etGreen}`}>
                  100
                </Box>
                <Box
                  style={{ margin: '-10px 0 0 -30px', fontWeight: 'bold' }}
                  fontSize='13px'
                >
                  COINS
                </Box>
              </Box>
            </Flex>

            <Flex align='center' justify='center' width='100%'>
              <Box p={1} px={8}>
                Sustainability listen to your favorite artist.
              </Box>
            </Flex>

            <Flex align='center' justify='center' width='100%' mb={2}>
              <Button
                width='80%'
                bg={`${theme.colors.etGreen}`}
                color='white'
                onClick={() => addToCart('coin100')}
                _hover={{
                  bg: `${theme.colors.etGreen}`,
                }}
              >
                $1.00
              </Button>
            </Flex>
          </Box>
        </Flex>

        {/* 200 */}
        <Flex
          maxWidth='768px'
          m='auto'
          align='center'
          style={{ textAlign: 'center' }}
          borderWidth='1px'
          mb={4}
          bg='white'
        >
          <Image
            src={`/uploads/coin200.png`}
            maxWidth={{ xs: '0px', sm: '175px' }}
          />

          <Box display={{ md: 'flex' }} width='100%' px={2}>
            <Flex align='center' justify='center'>
              <Box px={2}>
                <Toll width='40px' height='40px' />
              </Box>

              <Box width={{ md: '100%' }}>
                <Box fontSize='40px' color={`${theme.colors.etGreen}`}>
                  200
                </Box>
                <Box
                  style={{ margin: '-10px 0 0 -30px', fontWeight: 'bold' }}
                  fontSize='13px'
                >
                  COINS
                </Box>
              </Box>
            </Flex>

            <Flex align='center' justify='center' width='100%'>
              <Box p={1} px={8}>
                Sustainability listen to your favorite artist.
              </Box>
            </Flex>

            <Flex align='center' justify='center' width='100%' mb={2}>
              <Button
                width='80%'
                bg={`${theme.colors.etGreen}`}
                color='white'
                onClick={() => addToCart('coin200')}
                _hover={{
                  bg: `${theme.colors.etGreen}`,
                }}
              >
                $2.00
              </Button>
            </Flex>
          </Box>
        </Flex>

        {/* 300 */}
        <Flex
          maxWidth='768px'
          m='auto'
          align='center'
          style={{ textAlign: 'center' }}
          borderWidth='1px'
          mb={4}
          bg='white'
        >
          <Image
            src={`/uploads/coin300.png`}
            maxWidth={{ xs: '0px', sm: '175px' }}
          />

          <Box display={{ md: 'flex' }} width='100%' px={2}>
            <Flex align='center' justify='center'>
              <Box px={2}>
                <Toll width='40px' height='40px' />
              </Box>

              <Box width={{ md: '100%' }}>
                <Box fontSize='40px' color={`${theme.colors.etGreen}`}>
                  300
                </Box>
                <Box
                  style={{ margin: '-10px 0 0 -30px', fontWeight: 'bold' }}
                  fontSize='13px'
                >
                  COINS
                </Box>
              </Box>
            </Flex>

            <Flex align='center' justify='center' width='100%'>
              <Box p={1} px={8}>
                Sustainability listen to your favorite artist.
              </Box>
            </Flex>

            <Flex align='center' justify='center' width='100%' mb={2}>
              <Button
                width='80%'
                bg={`${theme.colors.etGreen}`}
                color='white'
                onClick={() => addToCart('coin300')}
                _hover={{
                  bg: `${theme.colors.etGreen}`,
                }}
              >
                $3.00
              </Button>
            </Flex>
          </Box>
        </Flex>
      </CoinContainer>
    </>
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
