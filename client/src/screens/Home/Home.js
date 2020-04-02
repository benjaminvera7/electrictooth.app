import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import AlbumCard from 'components/AlbumCard';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const Header = styled(Box)`
  ${FADE_IN}
`;

const Home = ({ AlbumActions, albums, theme }) => {
  console.log(theme);
  return (
    <Flex justify='center'>
      <Box color='white' maxW='1440px' flex='1' mt={2}>
        <Header mb={2}>
          <Image src='./water.gif' objectFit='cover' h='300px' w='100%' />
        </Header>

        <Flex wrap='wrap'>
          {albums.map((album, i) => (
            <AlbumCard album={album} key={i} />
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
