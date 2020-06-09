import React from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import Card from 'components/Card';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const AnimateHeader = styled(Box)`
  ${FADE_IN}
`;

const AnimateBody = styled(Flex)`
  ${FADE_IN}
`;

const Home = ({ AlbumActions, albums, theme, pending }) => {
  return (
    <>
      {pending ? (
        <div className='container'>
          <div className='centered'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='#05aea5'
              size='xl'
            />
          </div>
        </div>
      ) : (
        <>
          {' '}
          <AnimateHeader className='container'>
            <Image
              src='./water.gif'
              objectFit='cover'
              w='100%'
              h={{ lg: '800px' }}
            />

            <div className='centered'>
              <Image src='./logoani.gif' />
            </div>
          </AnimateHeader>
          <AnimateBody
            justify='center'
            px={{ xs: 2, lg: 0 }}
            my={{ sm: '0', md: '-100px', lg: '-200px', xl: '-200px' }}
          >
            <Box color='white' maxW='1440px' flex='1' mt='16px'>
              <Flex wrap='wrap' >
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

/*
      <Image
          src='./logoani.gif'
          position='relative'
        />
*/

// <Flex justify='center' px={{ xs: 2, lg: 0 }}>
//   <Box color='white' maxW='1440px' flex='1' mt='16px'>
//     <Header mb='16px'>
//       <Image
//         src='./water.gif'
//         objectFit='cover'
//         h={{ xs: '200px', sm: '200px', md: '300px' }}
//         w='100%'
//       />
//     </Header>

//     <Flex wrap='wrap' mx='-8px'>
//       {albums.map((album, i) => (
//         <Card album={album} key={i} />
//       ))}
//     </Flex>
//   </Box>
// </Flex>
export default connect(
  (state) => ({
    albums: state.album.albums,
    updatedAt: state.album.updatedAt,
    error: state.pender.failure['album/GET_ALBUMS'],
    pending: state.pender.pending['album/GET_ALBUMS'],
  }),
  (dispatch) => ({
    AlbumActions: bindActionCreators(albumActions, dispatch),
  }),
)(Home);
