import React, { Fragment } from 'react';
import { Box, Flex, Text, Heading, Image, Button, Icon } from '@chakra-ui/react';
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

// const CoinContainer = styled(Box)`
//   ${FADE_IN}
// `;

const CoinContainer = styled(Flex)`
  background: linear-gradient(90deg, #1D1D1D 0%, #342D54 100%);
`


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
    <Box backgroundColor={`${theme.colors.etBlack}`}>
      <Helmet>
        <title>Electric Tooth - coins</title>
        <meta name='description' content='amazing' />
      </Helmet>

      <Flex maxWidth='900px' m='auto' pb={4} mt='80px' flexDirection='column' justifyContent='center' alignItems='center'>

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
            justifyContent='space-between'
            alignItems='center'
            mx={4}
            minWidth='320px'
          >

            <Box>
              <Image src={`/${art_name}`} />
            </Box>

            <Box fontFamily='Spotify-Light'>{amount} Coins</Box>

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


          </CoinContainer>
        ))}



      </Flex>
    </Box>
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


       <Heading pt={2} as='h2' size='2xl' color={`${theme.colors.etGreen}`}>
          coins
        </Heading>

        <Text fontSize='sm' mb={4} color='grey'>
          $0.01 USD = 1 coin = 1 stream. 100% goes to the artists!
        </Text>

{
  coins.map(({ _id, art_name, price, amount, type }) => (
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
  ))
}
*/