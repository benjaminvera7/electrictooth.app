import React from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as albumActions from 'redux/modules/album';
import AlbumCard from 'components/AlbumCard';

const Catalog = ({ AlbumActions, albums }) => {
  return (
    <Flex justify='center'>
      <Box color='white' maxW='1100px' flex='1'>
        <Heading px={4} pt={2} as='h2' size='2xl'>
          catalog
        </Heading>

        <Text px={4} fontSize='sm' mb={4} color='grey'>
          All releases
        </Text>

        <Flex wrap='wrap' width='100%'>
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
)(Catalog);
