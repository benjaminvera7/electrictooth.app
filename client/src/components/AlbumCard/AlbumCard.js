import React from 'react';
import { Box, Flex, Image, Badge, IconButton, useToast } from '@chakra-ui/react';
import { PlaylistAdd, CartAdd } from 'components/Icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import useRouter from 'hooks/useRouter';
import theme from 'theme.js';
import useWindowSize from 'hooks/useWindowSize';

const CardContainer = styled(Box)`
  ${FADE_IN}
`;

const HoverCardContainer = styled(Box)`
  cursor: pointer;
`;

const HoverCard = ({ productId, img, name }) => {
  const isMobile = useWindowSize();
  const url = name.replaceAll(' ', '-');

  return (
    <HoverCardContainer width='100%' position='relative' isMobile={isMobile} minWidth="300px" minHeight="300px">
      <Link to={`/music/${url}`}>
        <Image src={`/uploads/${img}`} width='100%' objectFit='fill' maxHeight='288px' fallbackSrc="/sand.gif" />
      </Link>
    </HoverCardContainer>
  );
};

const AlbumCard = ({ auth, album, UserActions }) => {
  const router = useRouter();
  const toast = useToast()

  const addToPlaylist = (id, type) => {
    if (auth) {
      UserActions.addToPlaylist(id, type, auth);

      toast({
        title: "Saved to your Playlist",
        duration: 2000,
        status: 'success',
        isClosable: true,
      })
    } else {
      router.push('/signup');
    }
  };

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

  return (
    <CardContainer
      maxWidth="300px"
      minHeight="474px"
      boxShadow='8px 8px 0 #89DBFF'
      overflow='hidden'
      mb='32px'
      style={{ position: 'relative' }}
      border="2px solid #89DBFF"
      borderRadius="20px"
      backgroundColor={`${theme.colors.etBlack}`}
      mr={{ md: '32px' }}
    >
      <Box style={{ position: 'relative' }}>
        <HoverCard productId={album._id} img={album.art_name} name={album.album_name} />

        <Flex minHeight='118px' direction="column" justifyContent='center' px='16px'>
          <Box d='flex' alignItems='baseline' pb="10px">
            <Badge mr='8px' px={2} bg='white' variantColor='white' height="18px" style={{ fontFamily: 'Spotify-Light' }}>
              {album.type}
            </Badge>
            {album.tags.map((tag, i) => (
              <Badge mr='8px' px={2} bg={`${theme.colors.etBlue}`} variantColor='white' key={i} height="18px" style={{ fontFamily: 'Spotify-Light' }}>
                {tag}
              </Badge>
            ))}
          </Box>

          <Box fontWeight='semibold' fontSize="18px" lineHeight='tight' isTruncated color='white' pb="8px" style={{ fontFamily: 'Spotify-Bold' }}>
            {album.album_name}
          </Box>

          <Box color='white' fontSize="18px" style={{ fontFamily: 'Spotify-Light' }}>
            {album.artist_name}
          </Box>
        </Flex>
        <Box minHeight='64px'>
          <Flex style={{ position: 'absolute', bottom: 0, left: 0 }} width='100%' minHeight='64px'>
            <IconButton
              flex='1'
              variant='link'
              variantColor='teal'
              aria-label='Add album to cart'
              style={{
                borderTop: '2px',
                borderRight: '2px',
                borderStyle: 'solid',
                borderColor: '#89DBFF',
              }}
              height='64px'
              rounded='0px'
              icon={<CartAdd />}
              onClick={() => addToCart(album._id, album.type)}
            />
            <IconButton
              flex='1'
              variant='link'
              aria-label='Add album to playlist'
              height='64px'
              style={{
                borderTop: '2px',
                borderStyle: 'solid',
                borderColor: '#89DBFF',
              }}
              rounded='0px'
              icon={<PlaylistAdd />}
              onClick={() => addToPlaylist(album._id, album.type)}
            />
          </Flex>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    playlist: state.user.playlist,
    updatedAt: state.music.updatedAt,
    updatedUserAt: state.user.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(AlbumCard);
