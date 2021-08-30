import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { Account, Cart } from 'components/Icons';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
//import useWindowSize from 'hooks/useWindowSize';
import useRouter from 'hooks/useRouter';
import theme from 'theme.js';
import styled from '@emotion/styled';

const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  position: fixed;
  z-index: 2;
  background-color: #1d1d1d;
  height: 48px;
  width: 100%;
`;

const Logo = () => (
  <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5551 6.95324C17.9346 6.54283 16.9225 3.91869 16.0622 5.46084C14.8349 7.6497 13.0763 10.9081 12.6715 13.4203C12.4943 14.5769 13.7848 15.833 13.9746 14.6764C14.1644 13.4576 14.7084 12.1767 15.3284 10.7589C15.6067 10.1122 16.9857 7.57508 17.5551 6.95324Z" fill="white" />
    <path d="M21.4353 9.7515C21.3468 10.2241 20.7901 10.734 20.3346 10.9081C19.8159 11.1071 19.2086 10.9703 18.6266 10.7091C18.9176 10.4977 19.2086 10.3112 19.487 10.1619C19.8033 9.9878 21.5366 9.2416 21.4353 9.7515ZM22.7005 8.88093C22.4601 8.24666 21.6378 7.79894 21.1444 7.79894C19.9677 7.79894 18.6772 8.49539 17.7157 9.39084C16.5644 10.4604 15.7926 11.9901 15.7041 13.6815C15.6534 14.8132 16.9186 15.261 17.9181 15.261C19.3478 15.261 20.5877 14.6764 21.2835 14.1043C22.1692 13.3706 22.5361 12.4378 21.5366 12.8482C20.5624 13.2586 18.9556 13.7064 17.9181 13.4452C17.3108 13.2835 16.9692 13.2462 17.0831 12.6741C17.1211 12.4503 17.2223 12.2264 17.3488 12.015C19.158 12.9726 20.4865 12.7985 21.3594 12.1145C21.8908 11.6916 23.0927 9.90074 22.7005 8.88093Z" fill="white" />
    <path d="M28.9016 12.1767C28.4841 12.1269 27.5479 12.4378 26.9659 12.699C26.1688 13.0472 23.7144 13.5696 23.6891 12.9602C23.6511 12.1145 24.7645 11.3061 25.2199 10.933C25.7134 10.5474 26.5863 9.91318 27.1683 9.91318C27.725 9.91318 27.5985 10.7589 28.1046 10.8584C28.4715 10.9205 28.8637 10.4604 28.5221 9.01773C28.3449 8.2591 28.1425 7.72432 27.3328 7.81138C26.1435 7.94818 23.7523 9.91318 23.0565 11.0822C22.6136 11.8284 22.3227 12.699 22.5377 13.6069C22.7655 14.5272 23.3348 15.0122 24.1951 15.0122C25.2832 15.0122 25.9284 14.7262 27.0545 14.3282C27.3581 14.2163 28.6106 13.4825 28.8131 13.1218C29.0408 12.7114 29.1547 12.214 28.9016 12.1767Z" fill="white" />
    <path d="M35.6422 9.05505C35.6675 8.57001 34.5288 8.33372 33.8583 8.29641C34.1746 7.83625 34.4656 7.46315 34.6554 7.2766C35.0729 6.86619 34.3391 4.24204 33.3143 5.78419C32.7955 6.56771 32.2135 7.43827 31.6569 8.33372C31.0749 8.37103 30.4929 8.43321 29.9236 8.55758C29.5567 8.6322 29.5693 9.19185 29.6579 9.46546C29.7464 9.73906 30.2272 10.0997 30.5815 10.1868C30.0374 11.219 29.582 12.2513 29.3163 13.2586C29.0506 14.2536 30.3411 15.2858 31.1887 15.0371C31.9858 14.8008 33.6938 13.4452 33.9469 12.7861C34.1619 12.2264 33.3269 12.6617 33.0865 12.7736C32.4792 13.0721 31.3532 13.2213 31.1634 13.2213C31.1002 12.8731 31.581 11.8657 31.8593 11.4056C32.0238 11.1444 32.416 10.5101 32.8588 9.81368C33.3775 9.68932 33.8709 9.57739 34.2378 9.5152C34.5415 9.46546 35.6169 9.39084 35.6422 9.05505Z" fill="white" />
    <path d="M40.8001 9.83856C40.6483 8.75657 39.8639 8.35859 39.3325 8.49539C39.0668 8.57001 38.6872 8.80631 38.2444 9.21672C38.1432 8.35859 37.3968 7.07761 36.6123 8.37103C35.7141 9.86343 35.0309 11.8533 34.6133 13.184C34.2464 14.378 35.2333 15.9823 35.5875 14.7759C35.7014 14.4028 35.79 13.9551 36.0304 13.5447C37.4853 11.132 39.168 10.3485 39.9398 10.2614C40.2434 10.2241 40.3446 10.4106 40.5724 10.2987C40.6609 10.249 40.8381 10.1495 40.8001 9.83856Z" fill="white" />
    <path d="M43.6036 10.5474C43.9705 10.1246 43.0975 7.61239 42.2119 9.12967C41.4148 10.4853 40.7696 12.2264 40.4533 13.4328C40.1623 14.5272 41.2883 15.9823 41.554 14.8879C41.9082 13.4328 42.8445 11.418 43.6036 10.5474ZM45.3495 6.45578C45.2736 5.85882 45.1724 5.36135 44.5145 5.32404C43.9072 5.29916 43.3632 5.89612 43.3379 6.64233C43.2999 7.52533 43.7807 7.94818 44.641 7.94818C45.2483 7.94818 45.4128 6.97812 45.3495 6.45578Z" fill="white" />
    <path d="M49.8563 12.1767C49.4388 12.1269 48.5025 12.4378 47.9205 12.699C47.1235 13.0472 44.669 13.5696 44.6437 12.9602C44.6058 12.1145 45.7191 11.3061 46.1746 10.933C46.668 10.5474 47.541 9.91318 48.123 9.91318C48.6796 9.91318 48.5531 10.7589 49.0592 10.8584C49.4261 10.9205 49.8183 10.4604 49.4767 9.01773C49.2996 8.2591 49.0972 7.72432 48.2874 7.81138C47.0982 7.94818 44.707 9.91318 44.0111 11.0822C43.5683 11.8284 43.2773 12.699 43.4924 13.6069C43.7201 14.5272 44.2895 15.0122 45.1498 15.0122C46.2378 15.0122 46.8831 14.7262 48.0091 14.3282C48.3128 14.2163 49.5653 13.4825 49.7677 13.1218C49.9954 12.7114 50.1093 12.214 49.8563 12.1767Z" fill="white" />
    <path d="M15.444 2.95751C17.2297 3.11919 16.0079 0.278292 13.3529 0.0704217C10.6273 -0.137449 7.83122 0.116615 5.22313 0.809517C3.55489 1.24835 3.60188 3.46564 4.84719 3.95067C4.30677 4.80525 3.69587 5.70602 3.22594 6.51441C2.99098 6.65299 2.75601 6.79157 2.56804 6.93015C1.98063 7.43827 1.83966 8.17737 1.98063 8.82408C1.27574 10.233 0.641344 11.6881 0.0304401 13.3972C-0.251516 14.2287 1.48721 16.4691 2.68552 16.0303C4.7532 15.2681 10.6508 14.2749 12.8594 14.298C14.9741 14.298 13.1414 11.6188 11.0502 11.5957C8.39513 11.5726 6.98535 11.665 4.40076 12.1269C4.7767 11.203 5.27012 10.3023 5.64606 9.42459C7.52577 8.73169 11.4262 7.9464 12.2015 7.9464C14.3162 7.9464 14.1752 5.65983 12.0606 5.65983C11.1207 5.65983 9.00603 5.65983 7.3378 5.75221C7.76073 5.01312 8.44212 4.27402 8.93555 3.51183C11.0502 3.11919 13.6348 2.77274 15.444 2.95751Z" fill="white" />
    <path d="M14.8855 21.3336C16.3495 21.4775 15.585 18.9351 14.121 18.8072C12.8359 18.6953 10.5911 18.9351 9.1922 18.9351C8.2162 18.9351 6.45939 19.159 5.35326 19.4308C3.93806 19.7666 5.20686 21.8453 6.62206 21.5095C7.3378 21.3336 7.74446 21.3016 8.49273 21.3016C7.59806 22.4849 6.76846 23.8441 6.44313 24.7555C5.97139 26.0347 5.54846 26.3065 5.36953 27.6817C5.19059 29.1048 7.14259 30.4 7.32153 28.9769C7.38659 28.4812 7.56553 27.9375 7.79326 27.3459C8.4602 25.587 10.2658 22.8367 11.681 21.2697C12.9335 21.2697 14.2349 21.2697 14.8855 21.3336Z" fill="white" />
    <path d="M19.4267 23.5243C19.4267 25.7149 17.0681 27.5218 14.7257 27.6017C13.5707 27.6337 14.1075 26.0027 14.6606 25.2832C15.4251 24.2918 17.2633 22.9486 18.5483 22.8527C19.1014 22.8207 19.4267 22.9006 19.4267 23.5243ZM21.1835 23.4283C20.9395 21.8613 20.1913 20.758 18.4833 20.5981C16.759 20.4382 13.6033 22.7887 12.9038 24.0839C12.3507 25.1233 12.0579 25.571 12.0579 26.8342C12.0579 28.1774 13.9611 29.6005 15.5715 29.6005C17.491 29.6005 18.6622 28.9609 19.7033 27.7136C21.1835 25.9707 21.4113 24.8834 21.1835 23.4283Z" fill="white" />
    <path d="M28.9103 23.5243C28.9103 25.7149 26.5517 27.5218 24.2093 27.6017C23.0543 27.6337 23.5911 26.0027 24.1442 25.2832C24.9087 24.2918 26.7469 22.9486 28.0319 22.8527C28.585 22.8207 28.9103 22.9006 28.9103 23.5243ZM30.6671 23.4283C30.4231 21.8613 29.6749 20.758 27.9669 20.5981C26.2426 20.4382 23.0869 22.7887 22.3874 24.0839C21.8343 25.1233 21.5415 25.571 21.5415 26.8342C21.5415 28.1774 23.4447 29.6005 25.0551 29.6005C26.9746 29.6005 28.1458 28.9609 29.1869 27.7136C30.6671 25.9707 30.8949 24.8834 30.6671 23.4283Z" fill="white" />
    <path d="M38.8288 21.9572C38.8614 21.3336 37.3974 21.0298 36.5352 20.9818C36.9419 20.3902 37.316 19.9105 37.56 19.6707C38.0968 19.143 37.1534 15.7691 35.8358 17.7518C35.1688 18.7592 34.4205 19.8785 33.7048 21.0298C32.9565 21.0778 32.2083 21.1577 31.4763 21.3176C31.0045 21.4136 31.0208 22.1331 31.1347 22.4849C31.2485 22.8367 31.8667 23.3004 32.3221 23.4123C31.6227 24.7395 31.0371 26.0667 30.6955 27.3619C30.3539 28.6411 32.0131 29.9682 33.1029 29.6484C34.1277 29.3446 36.3238 27.6017 36.6491 26.7542C36.9256 26.0347 35.852 26.5943 35.5429 26.7382C34.7621 27.122 33.3144 27.3139 33.0704 27.3139C32.9891 26.8662 33.6072 25.571 33.9651 24.9793C34.1765 24.6436 34.6808 23.8281 35.2501 22.9326C35.9171 22.7727 36.5515 22.6288 37.0232 22.5489C37.4136 22.4849 38.7963 22.389 38.8288 21.9572Z" fill="white" />
    <path d="M46.6967 23.5083C47.201 22.7727 45.9647 20.8219 44.5657 21.2217C43.9151 21.4136 42.5487 22.5648 40.5153 24.8994C41.0033 23.908 43.4108 19.6547 44.2241 18.8711C44.7772 18.3435 43.6385 15.3214 42.3372 17.3041C40.4828 20.1184 38.1404 24.1159 37.3596 27.3459C37.0017 28.8329 38.3844 30.352 39.0188 28.9609C39.5719 27.7296 42.8252 24.2278 43.8988 24.0199C43.0692 25.3791 42.4023 27.3299 42.2884 27.8576C42.0607 28.8809 43.0692 30.2241 43.8175 29.9682C44.3218 29.8083 44.0777 29.1048 44.5495 27.8416C44.8585 27.0421 45.7857 24.8035 46.6967 23.5083Z" fill="white" />
  </svg>
)

const Help = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill={props.active ? theme.colors.etBlue : '#b3b3b3'}
    viewBox='0 0 24 24'
    id='help'
  >
    <path d='M11,18 L13,18 L13,16 L11,16 L11,18 L11,18 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z M12,6 C9.79,6 8,7.79 8,10 L10,10 C10,8.9 10.9,8 12,8 C13.1,8 14,8.9 14,10 C14,12 11,11.75 11,15 L13,15 C13,12.75 16,12.5 16,10 C16,7.79 14.21,6 12,6 L12,6 Z'></path>
  </svg>
)

const Navigation = ({ auth, cart, username }) => {
  //const isMobile = useWindowSize();
  const router = useRouter();
  //const history = useHistory();

  return (
    <NavigationContainer>
      <Flex maxW='1024px' flex='1' alignItems="center" justifyContent="space-between" h='48px'>

        <Flex flex='1' alignItems='center'>
          <Box w='80px' h='48px' py={2} pl={{ base: 5, sm: 4 }}>
            <Link to='/'>
              <Logo />
            </Link>
          </Box>

          <Box flex='1' style={{ cursor: 'pointer' }}>
            <Link to='/help'>
              <Help active={router.pathname === '/help'} />
            </Link>
          </Box>
        </Flex>



        <Flex justifyContent="space-evenly" alignItems="center" width="200px">
          <Link to='/coins'>
            <Button
              bg={`${theme.colors.etBlack}`}
              size='xs'
              color='white'
              border='1px solid white'
              style={{ fontFamily: 'Spotify-Light', textDecoration: 'none' }}
              variant='link'
              p={2}
              py={1}
            >
              Get coins
            </Button>
          </Link>

          {auth
            ? <>
              <Link to='/profile'>
                <Button variant='link'>
                  {auth ? (
                    <Account active={router.pathname === '/profile'} />
                  ) : (
                    <Account />
                  )}
                </Button>
              </Link>
              <Link to='/cart'>
                <Box style={{ position: 'relative' }}>
                  <Button variant='link' ml='-13px'>
                    <Cart active={router.pathname === '/cart'} />
                  </Button>
                  <Box
                    style={{
                      position: 'absolute',
                      color: `${theme.colors.etBlue}`,
                      top: '3px',
                      right: '14px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {cart.items?.length === 0 ? 0 : cart.items?.length}
                  </Box>
                </Box>
              </Link>
            </>
            : <>
              <Link to='/signup' >
                <Button
                  bg={`${theme.colors.etBlack}`}
                  border='1px solid white'
                  size='xs'
                  color='white'
                  variant='link'
                  p={2}
                  py={1}
                  style={{ fontFamily: 'Spotify-Light', textDecoration: 'none' }}
                >
                  Sign up
                </Button>
              </Link>
            </>
          }


        </Flex>

      </Flex>

    </NavigationContainer >
  );
};

export default connect(
  (state) => ({
    auth: state.user.authenticated,
    cart: state.user.cart,
    username: state.user.username,
    errorMessage: state.user.errorMessage,
    user: state.user,
    updatedAt: state.user.updatedAt,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Navigation);

/*

           {(history.location.pathname === '/' || '/download')
            ? (
              <Box w='48px' h='48px' py={2} pl={{ base: 5, sm: 4 }}>
                <Link to='/'>
                  <Logo />
                </Link>
              </Box>
            )
            : (
              <Flex direction='column' justifyContent='center' onClick={() => history.goBack()} style={{ 'cursor': 'pointer' }} w='48px' h='48px'>
                <svg width="75" height="48" viewBox="0 0 75 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="75" height="48" fill="#1D1D1D" />
                  <path d="M30 24H52" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M38 32L30 24L38 16" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </Flex>
            )
          }

        {/* {(!isMobile || !auth) && (
          <Fragment>
            <Link to='/'>
              <Box>
                <Button variant='link' mx={4}>
                  <Home active={router.pathname === '/'} />
                </Button>
              </Box>
            </Link>
          </Fragment>
        )}

 <Link to='/help'>
          <Box>
            <Button variant='link'>
              <Help active={router.pathname === '/help'} />
            </Button>
          </Box>
        </Link>



    <>
      <Box px={4}>
        <Link to='/'>
          <Logo />
        </Link>
      </Box>
      <Box mx='auto' />
      <Link to='/coins' >
        <Button
          bg={`${theme.colors.etBlack}`}
          size='xs'
          color='white'
          border='1px solid white'
          style={{ fontFamily: 'Spotify-Light', textDecoration: 'none' }}
          variant='link'
          p={2}
          py={1}
        >
          Get coins
        </Button>
      </Link>
      <Link to='/signup' >
        <Button
          bg={`${theme.colors.etBlack}`}
          border='1px solid white'
          size='xs'
          color='white'
          mx={4}
          mt='1px'
          variant='link'
          p={2}
          py={1}
        >
          sign up
        </Button>
      </Link>
    </>
  ) : (
  <>
    {' '}

    {history.location.pathname === "/"
      ?
      <Flex direction='column' justifyContent='center' ml="8px" pl="16px">
        <Logo />
      </Flex>
      :
      <Flex direction='column' justifyContent='center' ml="-8px" onClick={() => history.goBack()} style={{ 'cursor': 'pointer' }}>
        <svg width="75" height="48" viewBox="0 0 75 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="75" height="48" fill="#1D1D1D" />
          <path d="M30 24H52" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M38 32L30 24L38 16" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </Flex>
    }

    <Box mx='auto' />
    <Flex alignItems="center">
      <Link to='/coins' >
        <Button
          bg={`${theme.colors.etBlack}`}
          size='xs'
          color='white'
          border='1px solid white'
          style={{ fontFamily: 'Spotify-Light', textDecoration: 'none' }}
          variant='link'
          p={2}
          py={1}
        >
          Get coins
        </Button>
      </Link>
      <Box mt='8px' ml='10px'>
        <Link to='/profile'>
          <Button variant='link'>
            {auth ? (
              <Account active={router.pathname === '/profile'} />
            ) : (
              <Account />
            )}
          </Button>
        </Link>
      </Box>
      <Link to='/cart'>
        <Box style={{ position: 'relative' }}>
          <Button variant='link' mt='4px' mr="8px">
            <Cart active={router.pathname === '/cart'} />
          </Button>
          <Box
            style={{
              position: 'absolute',
              color: `${theme.colors.etBlue}`,
              top: '-2px',
              right: '21px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {cart.items?.length === 0 ? 0 : cart.items?.length}
          </Box>
        </Box>
      </Link>
    </Flex>

  </>
)
}
*/