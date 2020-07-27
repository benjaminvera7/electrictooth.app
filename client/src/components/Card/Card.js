import React, { useState, useRef } from 'react';
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
import {
  Star,
  PlaylistAdd,
  Download,
  Play,
  Pause,
  CartAdd,
} from 'components/Icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import useRouter from 'hooks/useRouter';
import toast from 'util/toast';
import theme from 'theme.js';
import useWindowSize from 'hooks/useWindowSize';

const CardContainer = styled(Box)`
  ${FADE_IN}
`;

const HoverCardContainer = styled(Box)`
  cursor: pointer;

  .mini {
    transition: 0.5s ease;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 4px;
    height: 100px;
    width: 100px;
    opacity: 0;
  }

  .big {
    ${(props) => props.isMobile && 'filter: brightness(60%);'}
  }

  .mini {
    ${(props) => props.isMobile && 'opacity: 1;'}
  }

  &:hover .big {
    ${(props) => !props.isMobile && `filter: brightness(60%);`}
  }

  &:hover .mini {
    opacity: 1;
  }
`;

const HoverCard = ({ productId, artUrl }) => {
  const isMobile = useWindowSize();
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);

  return (
    <HoverCardContainer width='100%' position='relative' isMobile={isMobile}>
      <audio key='audio' ref={audio} type='audio/mpeg' />

      <Link to={`/catalog/${productId}`}>
        <Image src={`/uploads/${artUrl}`} width='100%' className='big' />
      </Link>
      <Box className='mini'>
        <Image src={`/uploads/${artUrl}`} className='mini' />
        <IconButton
          onMouseLeave={() => {
            if (playing) {
              audio.current.pause();
              setPlaying(!playing);
            }
          }}
          onMouseEnter={() => {
            if (playing) {
              audio.current.pause();
              setPlaying(!playing);
            } else {
              audio.current.src = `/uploads/${productId}_preview.mp3`;
              audio.current.play();
              setPlaying(!playing);
            }
          }}
          onClick={() => {
            if (playing) {
              audio.current.pause();
              setPlaying(!playing);
            } else {
              audio.current.src = `/uploads/${productId}_preview.mp3`;
              audio.current.play();
              setPlaying(!playing);
            }
          }}
          variant='outline'
          variantColor='teal'
          fontSize='50px'
          rounded='50%'
          backgroundColor='white'
          style={{
            position: 'relative',
            left: '25%',
            top: '25%',
          }}
          icon={() =>
            playing ? (
              <Pause color={`${theme.colors.etGreen}`} />
            ) : (
              <Play color={`${theme.colors.etGreen}`} />
            )
          }
        />
      </Box>
    </HoverCardContainer>
  );
};

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

  const addToCart = (productId, type) => {
    if (auth) {
      UserActions.addToCart(productId, type, auth);

      toast(`Added to your Cart`);
    } else {
      router.push('/signup');
    }
  };

  return (
    <CardContainer
      flex={{ xs: '100%', sm: '100%', md: '45%', lg: '25%' }}
      boxShadow='0 2px 4px 0 rgba(0,0,0,.25)'
      bg='white'
      overflow='hidden'
      mx='8px'
      mb='16px'
      style={{ position: 'relative' }}
    >
      <Box style={{ position: 'relative' }}>
        <HoverCard productId={album.product_id} artUrl={album.art_url} />

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

          <Flex
            style={{ position: 'absolute', bottom: 0, left: 0 }}
            width='100%'
          >
            <IconButton
              flex='1'
              variant='ghost'
              variantColor='teal'
              aria-label='Add album to cart'
              fontSize='20px'
              style={{
                borderTop: '1px',
                borderRight: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(5, 174, 165, 0.3)',
              }}
              rounded='0px'
              icon={() => <CartAdd color={`${theme.colors.etGreen}`} />}
              onClick={() => addToCart(album.product_id, album.type)}
            />
            <IconButton
              flex='1'
              variant='ghost'
              variantColor='teal'
              aria-label='Add album to playlist'
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
      </Box>
    </CardContainer>
  );
};

/*
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
*/

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
