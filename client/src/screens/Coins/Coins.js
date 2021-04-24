import React from 'react';
import { Box, Flex, Text, Heading, Image, Button } from '@chakra-ui/core';
import { Toll } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import useRouter from 'hooks/useRouter';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import toast from 'util/toast';
import theme from 'theme.js';
import Helmet from 'react-helmet';

const CoinContainer = styled(Box)`
  ${FADE_IN}
`;

const Coins = ({ UserActions, auth, coins }) => {
  const router = useRouter();

  const addToCart = (id, type) => {
    if (auth) {
      UserActions.addToCart(id, type);
      toast(`Added to your Cart`);
    } else {
      router.push('/signup');
    }
  };

  if (coins.length <= 0) {
    return <div>loading...</div>
  }

  return (
    <>
      <Helmet>
        <title>Electric Tooth - coins</title>
        <meta name='description' content='amazing' />
      </Helmet>

      <CoinContainer maxWidth='900px' m='auto' px={4} pb={4} mt='40px'>
        <Heading pt={2} as='h2' size='2xl' color={`${theme.colors.etGreen}`}>
          coins
        </Heading>

        <Text fontSize='sm' mb={4} color='grey'>
          $0.01 USD = 1 coin = 1 stream. 100% goes to the artists!
        </Text>

        {coins.map(({ _id, art_name, price, amount, type }) => (
          <Box
            key={`${_id}`}
            maxWidth='768px'
            m='auto'
            align='center'
            style={{ textAlign: 'center' }}
            borderWidth='1px'
            mb={4}
            mt={8}
            bg='white'
            display={{ md: 'flex' }}
            borderRadius="20px"
          >
            <Box>
              <Image src={`/uploads/${art_name}`} width='100%' borderRadius={{ sm: '20px 20px 0 0', md: "20px 0 0 20px" }} />
            </Box>

            <Box display={{ md: 'flex' }} width='100%' px={2}>
              <Flex align='center' justify='center'>
                <Box px={{ xs: 0, sm: 2 }}>
                  <Toll width='40px' height='40px' />
                </Box>

                <Box width={{ md: '100%' }}>
                  <Box fontSize='40px' color={`${theme.colors.etGreen}`}>
                    {amount}
                  </Box>
                  <Box style={{ margin: '-10px 0 0 -30px', fontWeight: 'bold' }} fontSize='13px'>
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
                  onClick={() => addToCart(_id, type)}
                  _hover={{
                    bg: `${theme.colors.etGreen}`,
                  }}
                >
                  ${price}.00
              </Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </CoinContainer>
    </>
  );
};
export default connect(
  (state) => ({
    user: state.user,
    coins: state.music.coins,
    auth: state.user.authenticated,
    updatedAt: state.user.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Coins);