import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import Card from 'components/Card';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const Header = styled(Box)`
  ${FADE_IN}
`;

const Home = ({ AlbumActions, albums, theme }) => {
  console.log(theme);
  return (
    <Flex justify='center' px={{ xs: 2, lg: 0 }}>
      <Box color='white' maxW='1100px' flex='1' mt='16px'>
        <Header mb='16px'>
          <Image
            src='./water.gif'
            objectFit='cover'
            h={{ xs: '200px', sm: '200px', md: '300px' }}
            w='100%'
          />
        </Header>

        <Flex wrap='wrap' mx='-8px'>
          {albums.map((album, i) => (
            <Card album={album} key={i} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default connect(
  (state) => ({
    albums: state.album.albums,
    updatedAt: state.album.updatedAt,
    error: state.pender.failure['album/GET_ALBUMS'],
  }),
  (dispatch) => ({
    AlbumActions: bindActionCreators(albumActions, dispatch),
  }),
)(Home);
