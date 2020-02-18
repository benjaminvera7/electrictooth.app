import React from 'react';
import { Home, Bolt } from 'components/Icons';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/core';
import useRouter from 'hooks/useRouter';

const MobileNavigation = () => {
  const router = useRouter();

  return (
    <div className='mobile-navigation'>
      <Link to='/'>
        <Box px={2}>
          <Button variant='link' style={{ minHeight: '44px' }}>
            <Home active={router.pathname === '/'} />
          </Button>
        </Box>
      </Link>

      <Link to='/catalog'>
        <Box px={2}>
          <Button variant='link' style={{ minHeight: '44px' }}>
            <Bolt active={router.pathname === '/catalog'} />
          </Button>
        </Box>
      </Link>
    </div>
  );
};

export default MobileNavigation;
