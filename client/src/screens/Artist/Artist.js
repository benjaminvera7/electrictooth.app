import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';

const ArtistContainer = styled(Box)`
  ${FADE_IN}
`;

const Artist = ({ artists, pending, match }) => {
  let artistName = match.params.name.replaceAll('-', ' ');
  let currentArtist = artists.filter((a) => a.artist_name === artistName)[0];

  if (pending || pending === undefined) {
    return <div>loading</div>;
  }

  return (
    <ArtistContainer style={{ margin: '50px auto', maxWidth: '720px' }}>
      <Box color='black' width='100%' p='8px'>
        <>
          <Image src={`/uploads/${currentArtist.artist_img}`} width='100%' borderRadius="20px" />
          <Text>
            <b>{currentArtist.artist_name}</b>
          </Text>
        </>
      </Box>
      <Box color='black' width='100%' p='8px'>
        {currentArtist.artist_bio}
      </Box>
    </ArtistContainer>
  );
};

export default connect(
  (state) => ({
    artists: state.music.artists,
    updatedAt: state.music.updatedAt,
    pending: state.pender.pending['music/GET_ALBUMS'],
  }),
  null,
)(Artist);
