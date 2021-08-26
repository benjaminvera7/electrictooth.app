import React from 'react';
import { Box, Flex, Heading, Image, Button, useToast } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import useRouter from 'hooks/useRouter';
import styled from '@emotion/styled';
import theme from 'theme.js';
import Helmet from 'react-helmet';


const CoinContainer = styled(Flex)`
  background: linear-gradient(90deg, #1D1D1D 0%, #342D54 100%);
`

const Coins = ({ UserActions, auth, coins }) => {
  const router = useRouter();
  const toast = useToast()

  const addToCart = (id, type) => {
    if (auth) {
      UserActions.addToCart(id, type, null, auth);
      toast({
        title: "Added to your Cart",
        status: 'success',
        duration: 2000,
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
              <Image src='data:image/png;base64,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' />
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