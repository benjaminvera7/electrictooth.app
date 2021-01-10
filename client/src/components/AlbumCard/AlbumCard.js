import React from 'react';
import { Box, Flex, Text, Image, Heading, Button, Badge } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import useRouter from 'hooks/useRouter';
import toast from 'util/toast';

const Card = styled(Flex)`
  ${FADE_IN}
`;

const AlbumCard = ({ auth, album, UserActions, collection }) => {
  const router = useRouter();

  const addToPlaylist = (id) => {
    if (auth) {
      UserActions.addToPlaylist(auth, id);

      toast(`Saved to your Playlist`);
    } else {
      router.push('/signup');
    }
  };

  const addToCart = (id, type) => {
    if (auth) {
      UserActions.addToCart(id, type, auth);

      toast(`Added to your Cart`);
    } else {
      router.push('/signup');
    }
  };

  return (
    <Card className='card' wrap='wrap' p={2} borderWidth='1px' rounded='sm' mb={2} bg='white'>
      <Box className='card_image'>
        <Link to={`/catalog/${album._id}`}>
          <Image src={`/uploads/${album.art_name}`} rounded='lg' className='zoom' />
        </Link>
      </Box>

      <Box className='card_description'>
        <Heading
          mb={1}
          display='block'
          fontSize={['sm', 'md', 'lg', 'xl']}
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
          {album.artist_name}
        </Text>

        <Text display='block' fontSize='md' mb={1} lineHeight='normal' textAlign='right' color='#e2f4ff'>
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

        <Text my={2} mb={2} px={2} fontSize='sm' lineHeight='normal' fontWeight='light'>
          yes amazing album description
        </Text>
      </Box>

      <Button mt={1} width='100%' bg='#2d7bb8' onClick={() => addToCart(album._id, album.type)}>
        Buy Digital Album
      </Button>

      <Button mt={1} width='100%' bg='#134468' onClick={() => addToPlaylist(album._id)}>
        Add Album to Player
      </Button>
    </Card>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    collection: state.user.albumCollection,
    playlist: state.user.playlist,
    updatedAt: state.user.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(AlbumCard);
