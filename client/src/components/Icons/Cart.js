import React from 'react';
import theme from 'theme.js';
import { Flex } from '@chakra-ui/react';


// const Cart = (props) => (
//   <Icon {...props}>
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       fill={props.active ? theme.colors.etGreen : '#b3b3b3'}
//       viewBox='0 0 24 24'
//     >
//       <path d='M7,18 C5.9,18 5.01,18.9 5.01,20 C5.01,21.1 5.9,22 7,22 C8.1,22 9,21.1 9,20 C9,18.9 8.1,18 7,18 L7,18 Z M1,2 L1,4 L3,4 L6.6,11.59 L5.25,14.04 C5.09,14.32 5,14.65 5,15 C5,16.1 5.9,17 7,17 L19,17 L19,15 L7.42,15 C7.28,15 7.17,14.89 7.17,14.75 L7.2,14.63 L8.1,13 L15.55,13 C16.3,13 16.96,12.59 17.3,11.97 L20.88,5.48 C20.96,5.34 21,5.17 21,5 C21,4.45 20.55,4 20,4 L5.21,4 L4.27,2 L1,2 L1,2 Z M17,18 C15.9,18 15.01,18.9 15.01,20 C15.01,21.1 15.9,22 17,22 C18.1,22 19,21.1 19,20 C19,18.9 18.1,18 17,18 L17,18 Z'></path>
//     </svg>
//   </Icon>
// );
const Cart = (props) => (

  <Flex h='48px' alignItems='center' {...props}>
    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 4H5.4V17.2H20.0667L23 6.93333" stroke={props.active ? theme.colors.etBlue : "white"} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.13332 26C7.34835 26 8.33332 25.015 8.33332 23.8C8.33332 22.5849 7.34835 21.6 6.13332 21.6C4.91829 21.6 3.93332 22.5849 3.93332 23.8C3.93332 25.015 4.91829 26 6.13332 26Z" stroke={props.active ? theme.colors.etBlue : "white"} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M19.3333 26C20.5484 26 21.5333 25.015 21.5333 23.8C21.5333 22.5849 20.5484 21.6 19.3333 21.6C18.1183 21.6 17.1333 22.5849 17.1333 23.8C17.1333 25.015 18.1183 26 19.3333 26Z" stroke={props.active ? theme.colors.etBlue : "white"} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </Flex>

);

export default Cart;
