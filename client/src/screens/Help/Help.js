import React from 'react';
import { Box, Flex, Text, Heading, List, ListItem } from '@chakra-ui/react';
import theme from 'theme.js';

const Help = () => {
  return (
    <Flex justify='center' mt='64px' backgroundColor={`${theme.colors.etBlack}`}>
      <Box color='white' maxW='900px' flex='1' px={{ xs: 2, lg: 2 }}>
        <Heading pt={2} as='h4' size='md' color='white' fontFamily='Spotify-Bold' px='14px'>
          Help
        </Heading>

        <Text fontSize='md' mb={4} color='white' fontFamily='Spotify-Light' px='14px'>
          Electric Tooth, an indie streaming service.
        </Text>

        <Box px={4}>
          <Heading pt={2} pb={2} as='h2' size='md' fontFamily='Spotify-Bold'>
            Getting started:
          </Heading>

          <List spacing={3} px={2}>

            <ListItem fontSize='lg' color='white' fontFamily='Spotify-Light'>
              <Flex alignItems='center'>
                <Flex h='40px' alignItems='center'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9999 12.7334C14.025 12.7334 15.6666 11.0917 15.6666 9.06669C15.6666 7.04165 14.025 5.40002 11.9999 5.40002C9.9749 5.40002 8.33328 7.04165 8.33328 9.06669C8.33328 11.0917 9.9749 12.7334 11.9999 12.7334Z" stroke="white" fill='white' stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M19.2644 20.2442C18.6085 18.8738 17.5784 17.7168 16.293 16.907C15.0076 16.0971 13.5193 15.6674 12 15.6674C10.4807 15.6674 8.99243 16.0971 7.707 16.907C6.42158 17.7168 5.39145 18.8738 4.7356 20.2442" stroke="white" fill='white' stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </Flex>
                <Text pl='16px'>Create an account.</Text>
              </Flex>
            </ListItem>

            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light'>
              <Flex alignItems='center'>
                <Flex h='40px' alignItems='center'>
                  <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.78036V12.4061C1 15.1508 5.5276 17.3753 11.1119 17.3753C16.6962 17.3753 21.2238 15.1508 21.2238 12.4061V5.78036" stroke="#89DBFF" stroke-miterlimit="10" />
                    <path d="M1 12.4049V19.0306C1 21.7753 5.5276 23.9999 11.1119 23.9999C16.6962 23.9999 21.2238 21.7753 21.2238 19.0306V12.4049" stroke="#89DBFF" stroke-miterlimit="10" />
                    <path d="M11.1119 10.7491C16.6965 10.7491 21.2238 8.52428 21.2238 5.77982C21.2238 3.03537 16.6965 0.810547 11.1119 0.810547C5.52725 0.810547 1 3.03537 1 5.77982C1 8.52428 5.52725 10.7491 11.1119 10.7491Z" stroke="#89DBFF" stroke-miterlimit="10" stroke-linecap="square" />
                  </svg>
                </Flex>
                <Text pl='16px'>1 coin = $0.01 USD = 1 stream.</Text>
              </Flex>
            </ListItem>

            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light'>
              <Flex alignItems='center'>
                <Flex h='40px' alignItems='center'>
                  <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8713 4.95783H0.677734V6.99008H12.8713V4.95783ZM12.8713 0.893311H0.677734V2.92557H12.8713V0.893311ZM16.9358 9.02234V4.95783H14.9035V9.02234H10.839V11.0546H14.9035V15.1191H16.9358V11.0546H21.0003V9.02234H16.9358ZM0.677734 11.0546H8.80677V9.02234H0.677734V11.0546Z" fill="#89DBFF" />
                  </svg>
                </Flex>
                <Text pl='14px'>Add an album or song to your Playlist.</Text>
              </Flex>
            </ListItem>

            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light'>
              <Flex alignItems='center'>
                <Flex h='40px' alignItems='center' justifyContent='center' ml='-5px'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='white'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </Flex>
                <Text pl='15px'>As long as you have coins, you can stream any unpurchased album or song.</Text>
              </Flex>
            </ListItem>

            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light'>
              <Flex alignItems='center'>
                <Flex h='40px' alignItems='center'>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0.5V12.125" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" />
                    <path d="M4.5 7.625L9 12.125L13.5 7.625" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M1.125 15.5H16.875" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" />
                  </svg>
                </Flex>
                <Text pl='14px'>If you purchase an album or song, you can view and download it in your Profile.</Text>
              </Flex>
            </ListItem>


            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light'>
              <Flex alignItems='center'>
                <Flex h='40px' alignItems='center'>
                  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Action" transform="translate(-50.000000, -434.000000)">
                        <g id="ic_grade" transform="translate(48.000000, 432.000000)">
                          <g id="Icon-24px">
                            <polygon id="Shape" fill="#89DBFF" points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21"></polygon>
                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </Flex>
                <Text pl='14px'>If you purchase an album or song, streaming it no longer uses a coin.</Text>
              </Flex>
            </ListItem>

          </List>
        </Box>

        <Box px={4}>
          <Heading pt={8} pb={2} as='h2' size='md' color='white'>
            Notes:
          </Heading>

          <Flex align='center' pb={3}>
            <Text fontSize='xl' color='white' fontFamily='Spotify-Light' >
              1 coin = $0.01 USD = 1 stream.
            </Text>
          </Flex>

          <Flex align='center' pb={3}>
            <Text fontSize='xl' color='white' fontFamily='Spotify-Light' >
              100% of digital download and streaming revenue goes to the artist!
            </Text>
          </Flex>

          <Flex align='center' pb={3}>
            <Text fontSize='xl' color='white' fontFamily='Spotify-Light' >
              Coded by{' '}
              <a href='https://twitter.com/princebiomass' style={{ color: '#0FF4C6', textDecoration: 'underline' }}>
                Ben.
              </a>
            </Text>
          </Flex>
        </Box>

      </Box>
    </Flex>
  );
};

export default Help;

/*

 <Flex justify='center'>
      <Box color='white' maxW='1440px' flex='1'>
        <Heading px={4} pt={2} as='h2' size='2xl' color={theme.colors.etGreen}>
          help
        </Heading>

        <Text px={4} fontSize='sm' mb={4} color='grey'>
          Electric Tooth, an indie streaming service.
        </Text>

        <Flex px={4} pb={2}>
          (mission statement)
        </Flex>
        <Box px={4}>
          <Heading pt={2} pb={2} as='h2' size='md' color='gray.600'>
            Getting started:
          </Heading>

          <List spacing={3} px={2}>
            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light' >
              <ListIcon icon='add' color='blue.300' />
              Create an account.
            </ListItem>
            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light' >
              <Flex align='center'>
                <Box pr={1}>
                  <Toll height='22px' width='22px' />
                </Box>
                <Text fontSize='xl' color='white' fontFamily='Spotify-Light' >
                  1 coin = $0.01 USD = 1 stream.
                </Text>
              </Flex>
            </ListItem>
            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light' >
              <ListIcon icon='plus-square' color='teal.300' />
              Add and Save an album or song to your Playlist.
            </ListItem>
            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light' >
              <ListIcon icon='info' color='yellow.300' />
              As long as you have coins, you can stream any unpurchased album or song.
            </ListItem>
            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light' >
              <ListIcon icon='download' color='purple.300' />
              If you purchase an album or song, you can view and download it in your Profile.
            </ListItem>
            <ListItem fontSize='xl' color='white' fontFamily='Spotify-Light' >
              <ListIcon icon='check-circle' color='green.300' />
              If you purchase an album or song, streaming it no longer uses a coin.
            </ListItem>
          </List>
        </Box>

        <Box px={4}>
          <Heading pt={8} pb={2} as='h2' size='md' color='gray.600'>
            Notes:
          </Heading>

          <Flex align='center' pb={3}>
            <Box px={2}>
              <Toll height='22px' width='22px' />
            </Box>
            <Text fontSize='xl' color='white' fontFamily='Spotify-Light' >
              1 coin = $0.01 USD = 1 stream.
            </Text>
          </Flex>

          <Flex align='center' pb={3}>
            <Box px={2} fontSize='xl'>
              <ListIcon icon='arrow-down' color='green.300' />
            </Box>
            <Text fontSize='xl' color='white' fontFamily='Spotify-Light' >
              100% of digital download and streaming revenue goes to the artist!
            </Text>
          </Flex>

          <Flex align='center' pb={3}>
            <Box px={2}>
              <Star height='26px' width='26px' />
            </Box>
            <Text fontSize='xl' color='white' fontFamily='Spotify-Light' >
              Coded by{' '}
              <a href='https://twitter.com/princebiomass' style={{ color: '#0FF4C6', textDecoration: 'underline' }}>
                Ben.
              </a>
            </Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
*/