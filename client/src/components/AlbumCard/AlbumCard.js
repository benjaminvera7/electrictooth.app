import React from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Button,
  Badge,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import * as playerActions from 'redux/modules/player';
import { useToast } from '@chakra-ui/core';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import useRouter from 'hooks/useRouter';

const Card = styled(Flex)`
  ${FADE_IN}
`;

const AlbumCard = ({
  auth,
  album,
  UserActions,
  PlayerActions,
  albumCollection,
  history,
}) => {
  const toast = useToast();
  const router = useRouter();

  const addAlbum = (albumId) => {
    if (auth) {
      PlayerActions.addAlbumToPlaylist(auth, albumId);

      toast({
        position: 'top',
        title: 'Playlist updated.',
        description: `Album ${album.album_name} added.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } else {
      router.push('/signup');
    }
  };

  const addToCart = (productId) => {
    if (auth) {
      UserActions.addToCart(productId, auth);

      toast({
        position: 'top',
        title: 'Cart updated.',
        description: `Album ${album.album_name} added.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      router.push('/signup');
    }
  };

  let exists;

  exists = albumCollection.filter((ac) => ac.id === album._id);

  return (
    <Card
      className='card'
      wrap='wrap'
      p={2}
      borderWidth='1px'
      rounded='lg'
      mb={2}
    >
      <Box className='card_image'>
        <Link to={`/catalog/${album._id}`}>
          <Image src={`/uploads/${album.art_url}`} rounded='lg' />
        </Link>
      </Box>

      <Box className='card_description'>
        <Heading
          mb={1}
          display='block'
          fontSize='xl'
          as='h6'
          size='md'
          lineHeight='normal'
          fontWeight='semibold'
          textAlign='right'
          color='#6eacdd'
        >
          {album.album_name}
        </Heading>

        <Text
          fontWeight='light'
          textTransform='uppercase'
          fontSize='xs'
          letterSpacing='wide'
          textAlign='right'
          color='grey'
        >
          {album.artist.artist_name}
        </Text>

        <Text
          display='block'
          fontSize='md'
          mb={1}
          lineHeight='normal'
          textAlign='right'
          color='#e2f4ff'
        >
          $ {album.download_price}
        </Text>

        <Badge fontSize='0.6em' variantColor='teal' mx={1}>
          NuDisco
        </Badge>
        <Badge fontSize='0.6em' variantColor='teal' mr={1}>
          House
        </Badge>
        <Badge fontSize='0.6em' variantColor='teal' mr={1}>
          Indie
        </Badge>

        <Text
          my={2}
          mb={2}
          px={2}
          fontSize='sm'
          lineHeight='normal'
          fontWeight='light'
        >
          yes amazing album description
        </Text>
      </Box>

      {exists.length === 0 ? (
        <Button
          mt={1}
          width='100%'
          bg='#2d7bb8'
          onClick={() => addToCart(album.product_id)}
        >
          Buy Digital Album
        </Button>
      ) : (
        <Button
          mt={1}
          width='100%'
          bg='#2d7bb8'
          onClick={() => router.push('/profile')}
        >
          View in Collection
        </Button>
      )}

      <Button
        mt={1}
        width='100%'
        bg='#134468'
        onClick={() => addAlbum(album._id)}
      >
        Add Album to Player
      </Button>
    </Card>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    albumCollection: state.user.albumCollection,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    PlayerActions: bindActionCreators(playerActions, dispatch),
  }),
)(AlbumCard);
