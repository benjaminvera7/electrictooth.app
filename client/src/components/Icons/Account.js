import React from "react";
import theme from 'theme.js';
import { Flex } from '@chakra-ui/react';


// const Account = props => (
//   <Icon {...props}>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       fill={props.active ? theme.colors.etGreen : "#b3b3b3"}
//       viewBox="0 0 24 24"
//     >
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
//     </svg>
//   </Icon>
// );
const Account = props => (
  <Flex h='48px' alignItems='center' {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9999 12.7334C14.025 12.7334 15.6666 11.0917 15.6666 9.06669C15.6666 7.04165 14.025 5.40002 11.9999 5.40002C9.9749 5.40002 8.33328 7.04165 8.33328 9.06669C8.33328 11.0917 9.9749 12.7334 11.9999 12.7334Z" stroke={props.active ? theme.colors.etBlue : "white"} fill={props.active && theme.colors.etBlue} stroke-linecap="round" stroke-linejoin="round" />
      <path d="M19.2644 20.2442C18.6085 18.8738 17.5784 17.7168 16.293 16.907C15.0076 16.0971 13.5193 15.6674 12 15.6674C10.4807 15.6674 8.99243 16.0971 7.707 16.907C6.42158 17.7168 5.39145 18.8738 4.7356 20.2442" stroke={props.active ? theme.colors.etBlue : "white"} fill={props.active && theme.colors.etBlue} stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" stroke={props.active ? theme.colors.etBlue : "white"} stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </Flex>
);

export default Account;
