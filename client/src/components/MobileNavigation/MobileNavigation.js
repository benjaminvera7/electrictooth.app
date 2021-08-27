import React from 'react';
import { Home, Playlist, Toll } from 'components/Icons';
import { Link } from 'react-router-dom';
import { Flex, Box, Button } from '@chakra-ui/react';
import useRouter from 'hooks/useRouter';
import { connect } from 'react-redux';
import theme from 'theme.js';
import styled from '@emotion/styled';

//var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
// padding - bottom: ${ isIOS ? 'calc(.5rem + env(safe-area-inset-bottom))' : '0px' };
// padding - top: ${ isIOS ? 'calc(.5rem + env(safe-area-inset-top))' : '0px' };

const MobileNavigationContainer = styled(Flex)`
  position: fixed;
  display: flex;
  bottom: 0px;
  z-index: 2;
  background-color: var(--et-gray);
  color: var(--color-50);
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  min-height: 50px
  padding-top: env(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1px solid black;
`;

const MobileNavigation = ({
  playlistVisible,
  setPaylistVisibility,
  playlist,
  coins,
}) => {
  const router = useRouter();

  return (
    <MobileNavigationContainer>
      <Link to='/'>
        <Box px={2}>
          <Button variant='link' style={{ minHeight: '44px' }}>
            <Home active={router.pathname === '/'} />
          </Button>
        </Box>
      </Link>

      <Flex align='center'>
        <Box px={2}>
          <Toll height='26px' width='26px' />
        </Box>
        <Box minWidth='25px' color={`${theme.colors.etBlue}`} fontFamily='Spotify-Light'>
          <b>{coins}</b>
        </Box>
      </Flex>

      <Box
        px={2}
        onClick={() => setPaylistVisibility(!playlistVisible)}
        style={{ position: 'relative' }}
      >
        <Button variant='link' style={{ minHeight: '44px' }}>
          <Playlist />
          <Box
            style={{
              position: 'absolute',
              color: `${theme.colors.etViolet}`,
              top: '-14px',
              right: '-4px',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            {playlist.length === 0 ? '' : '•'}
          </Box>
        </Button>
      </Box>
    </MobileNavigationContainer>
  );
};
export default connect((state) => ({
  playlist: state.user.playlist,
  updatedAt: state.user.updatedAt,
  coins: state.user.coins,
}))(MobileNavigation);
