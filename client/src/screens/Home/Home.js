import React from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from 'components/Card';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const AnimateHeader = styled(Box)`
  ${FADE_IN}
`;

const AnimateBody = styled(Flex)`
  ${FADE_IN}
`;

const Home = ({ albums, pending }) => {
  return (
    <>
      {pending ? (
        <div className='container'>
          <div className='centered'>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='#05aea5' size='xl' />
          </div>
        </div>
      ) : (
        <>
          {' '}
          <AnimateHeader className='container'>
            <Image src='./water.gif' objectFit='cover' w='100%' h='40vh' />

            <div className='centered'>
              <Image src='./logoani.gif' />
            </div>
          </AnimateHeader>
          <AnimateBody
            justify='center'
            px={{ xs: 2, lg: 0 }}
            my={{ sm: '0', md: '-100px', lg: '-100px', xl: '-100px' }}
          >
            <Box color='white' maxW='1440px' flex='1' mt='16px'>
              <Flex wrap='wrap'>
                {albums.map((album, i) => (
                  <Card album={album} key={i} />
                ))}
              </Flex>
            </Box>
          </AnimateBody>
        </>
      )}
    </>
  );
};

export default connect(
  (state) => ({
    albums: state.products.albums,
    updatedAt: state.products.updatedAt,
    error: state.pender.failure['products/GET_ALBUMS'],
    pending: state.pender.pending['products/GET_ALBUMS'],
  }),
  null,
)(Home);
