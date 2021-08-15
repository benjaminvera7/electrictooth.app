import React from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import { connect } from 'react-redux';
import AlbumCard from 'components/AlbumCard';
import ProductCard from 'components/ProductCard';
import Helmet from 'react-helmet';
import theme from 'theme.js';

const Home = ({ albums, products, pending }) => {
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
        <title>Electric Tooth - home</title>
        <meta name='description' content='amazing' />
      </Helmet>

      <Flex justify='center' mt='64px' backgroundColor={`${theme.colors.etBlack}`}>
        <Box color='white' maxW='768px' flex='1'>
          <Flex justifyContent="center">
            <Image src='./water.gif' w='300px' borderRadius="16px" mb='32px' />
          </Flex>

          <Flex wrap='wrap' justifyContent="center">
            {albums.map((album, i) => (
              <AlbumCard album={album} key={i} />
            ))}
            {/* {products.map((product, i) => (
              <ProductCard product={product} key={i} />
            ))} */}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default connect(
  (state) => ({
    albums: state.music.albums,
    products: state.music.products,
    updatedAt: state.music.updatedAt,
    error: state.pender.failure['music/GET_ALBUMS'],
    pending: state.pender.pending['music/GET_ALBUMS'],
  }),
  null,
)(Home);
