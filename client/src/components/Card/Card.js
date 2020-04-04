import React from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Button,
  Badge,
  IconButton,
} from '@chakra-ui/core';
import { Star, PlaylistAdd, Download, Play, CartAdd } from 'components/Icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import useRouter from 'hooks/useRouter';
import toast from 'util/toast';
import theme from 'theme.js';

const CardContainer = styled(Box)`
  ${FADE_IN}
`;

const Card = ({ auth, album, UserActions, collection }) => {
  const router = useRouter();

  const addToPlaylist = (productId) => {
    if (auth) {
      UserActions.addToPlaylist(auth, productId);

      toast(`Saved to your Playlist`);
    } else {
      router.push('/signup');
    }
  };

  const addToCart = (productId) => {
    if (auth) {
      UserActions.addToCart(productId, auth);

      toast(`Added to your Cart`);
    } else {
      router.push('/signup');
    }
  };

  return (
    <CardContainer
      flex={{ xs: '100%', sm: '100%', md: '50%', lg: '33.333333%' }}
      borderWidth='1px'
      bg='white'
      overflow='hidden'
      mb={2}
      style={{ position: 'relative' }}
    >
      <Link to={`/catalog/${album.product_id}`}>
        <Image src={`/uploads/${album.art_url}`} width='100%' />
      </Link>
      <Box p='4'>
        <Box d='flex' alignItems='baseline'>
          <Badge
            px='2'
            bg={`${theme.colors.etGreen}`}
            variantColor='white'
            mr={1}
          >
            Disco
          </Badge>
          <Badge
            px='2'
            bg={`${theme.colors.etGreen}`}
            variantColor='white'
            mr={1}
          >
            House
          </Badge>
          <Badge
            px='2'
            bg={`${theme.colors.etGreen}`}
            variantColor='white'
            mr={1}
          >
            Indie
          </Badge>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
          color='gray.600'
        >
          {album.album_name}
        </Box>

        <Box color='gray.500' mb={8}>
          {album.artist_name}
        </Box>

        <Flex style={{ position: 'absolute', bottom: 0, left: 0 }} width='100%'>
          <IconButton
            flex='1'
            variant='ghost'
            variantColor='teal'
            aria-label='Download album'
            fontSize='20px'
            style={{
              borderTop: '1px',
              borderRight: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(5, 174, 165, 0.3)',
            }}
            rounded='0px'
            icon={() => <Play color={`${theme.colors.etGreen}`} />}
          />
          <IconButton
            flex='1'
            variant='ghost'
            variantColor='teal'
            aria-label='Download album'
            fontSize='20px'
            style={{
              borderTop: '1px',
              borderRight: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(5, 174, 165, 0.3)',
            }}
            rounded='0px'
            icon={() => <CartAdd color={`${theme.colors.etGreen}`} />}
            onClick={() => addToCart(album.product_id)}
          />
          <IconButton
            flex='1'
            variant='ghost'
            variantColor='teal'
            aria-label='Download album'
            fontSize='20px'
            style={{
              borderTop: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(5, 174, 165, 0.3)',
            }}
            rounded='0px'
            icon={() => <PlaylistAdd color={`${theme.colors.etGreen}`} />}
            onClick={() => addToPlaylist(album.product_id)}
          />
        </Flex>
      </Box>
    </CardContainer>
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    collection: state.user.albumCollection,
    playlist: state.user.playlist,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Card);
