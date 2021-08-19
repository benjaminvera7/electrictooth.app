import React, { Fragment } from 'react';
import { Box, Flex, Text, Heading, Image, Button, Icon, useToast } from '@chakra-ui/react';
import { Toll } from 'components/Icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import useRouter from 'hooks/useRouter';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import theme from 'theme.js';
import Helmet from 'react-helmet';

// const CoinContainer = styled(Box)`
//   ${FADE_IN}
// `;

const CoinContainer = styled(Flex)`
  background: linear-gradient(90deg, #1D1D1D 0%, #342D54 100%);
`


const Coins = ({ UserActions, auth, coins }) => {
  const router = useRouter();
  const toast = useToast()

  const addToCart = (id, type) => {
    if (auth) {
      UserActions.addToCart(id, type);
      toast({
        title: "Added to your Cart",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      router.push('/signup');
    }
  };

  if (coins.length <= 0) {
    return <div>loading...</div>
  }

  return (
    <Box backgroundColor={`${theme.colors.etBlack}`} px={4}>
      <Helmet>
        <title>Electric Tooth - coins</title>
        <meta name='description' content='amazing' />
      </Helmet>

      <Flex justify='center' mt='64px'>
        <Box color='white' maxW='900px' flex='1' px={{ xs: 2, lg: 2 }}>

          <Flex justifyContent='center' alignItems='center' px={4} pb={2}>
            <Box justifyContent='center'>
              <Image src='/3coins.png' />
            </Box>

            <Flex flexDirection='column' color="white" justifyContent='center' px={4}>
              <Heading fontFamily='Spotify-Bold'>Coins</Heading>
              <Box fontFamily='Spotify-Light'>Sustainably listen to your favorite artists.</Box>
            </Flex>
          </Flex>

          <Flex justifyContent='center' alignItems='center' color={`${theme.colors.etViolet}`} fontFamily='Spotify-Bold' py={4} fontSize='12px'>
            $0.01 USD = 1 coin = 1 stream. 100% goes to the artists!
          </Flex>

          {coins.map(({ _id, art_name, price, amount, type }) => (
            <CoinContainer
              color='white'
              px={4}
              boxShadow='8px 8px 0 #89DBFF'
              border="2px solid #89DBFF"
              borderRadius="20px"
              h='100px'
              mb='24px'
              alignItems='center'
              mx={4}
              minWidth='320px'
              justifyContent='space-between'
            >

              <Box w="71px">
                <Image src={`/${art_name}`} />
              </Box>

              <Flex fontFamily='Spotify-Light'>
                <Box>{amount} Coins</Box>
              </Flex>

              <Flex>
                <Button
                  bg={`${theme.colors.etBlue}`}
                  color='black'
                  onClick={() => addToCart(_id, type)}
                  _hover={{
                    bg: `${theme.colors.etBlue}`,
                  }}
                  h='29px'
                  w='80px'
                  fontSize='12px'
                >
                  ${price}.00
                </Button>
              </Flex>


            </CoinContainer>
          ))}


        </Box>
      </Flex >
    </Box >
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


/*


              <Box>
                <Image src={`/${art_name}`} />
              </Box>

              <Box fontFamily='Spotify-Light'>{amount} Coins</Box>

              <Box>
                <Button
                  bg={`${theme.colors.etBlue}`}
                  color='black'
                  onClick={() => addToCart(_id, type)}
                  _hover={{
                    bg: `${theme.colors.etBlue}`,
                  }}
                  h='29px'
                  w='80px'
                  fontSize='12px'
                >
                  ${price}.00
                </Button>
              </Box>
              */