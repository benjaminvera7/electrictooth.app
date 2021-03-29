import React from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/core';
import { connect } from 'react-redux';
import Card from 'components/Card';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';

const AnimateHeader = styled(Box)`
  ${FADE_IN}
`;

const AnimateBody = styled(Flex)`
  ${FADE_IN}
`;

const Home = ({ albums, pending }) => {
  if (pending || pending === undefined) {
    return (
      <div className='container'>
        <div className='centered'>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='#05aea5' size='xl' />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Electric Tooth</title>
        <meta name='description' content='amazing' />
      </Helmet>
      <AnimateHeader className='container'>
        <Image src='./water.gif' objectFit='cover' w='100%' h='40vh' />

        <div className='centered'>
          <Image src='./logoani.gif' />
        </div>
      </AnimateHeader>
      <AnimateBody justify='center' px={{ xs: 2, lg: 0 }} my={{ sm: '0', md: '-100px', lg: '-100px', xl: '-100px' }}>
        <Box color='white' maxW='915px' flex='1' mt='16px'>
          <Flex wrap='wrap'>
            {albums.map((album, i) => (
              <Card album={album} key={i} />
            ))}
          </Flex>
        </Box>
      </AnimateBody>
    </>
  );
};

export default connect(
  (state) => ({
    albums: state.music.albums,
    updatedAt: state.music.updatedAt,
    error: state.pender.failure['music/GET_ALBUMS'],
    pending: state.pender.pending['music/GET_ALBUMS'],
  }),
  null,
)(Home);
