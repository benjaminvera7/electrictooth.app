import React from 'react';
import Icon from '../Icon';
import theme from 'theme.js';

// const Playlist = (props) => (
//   <Icon {...props}>
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       fill={props.active ? theme.colors.etGreen : '#b3b3b3'}
//       viewBox='0 0 24 24'
//     >
//       <path d='M15,6 L3,6 L3,8 L15,8 L15,6 L15,6 Z M15,10 L3,10 L3,12 L15,12 L15,10 L15,10 Z M3,16 L11,16 L11,14 L3,14 L3,16 L3,16 Z M17,6 L17,14.18 C16.69,14.07 16.35,14 16,14 C14.34,14 13,15.34 13,17 C13,18.66 14.34,20 16,20 C17.66,20 19,18.66 19,17 L19,8 L22,8 L22,6 L17,6 L17,6 Z'></path>
//     </svg>
//   </Icon>
// );
const Playlist = (props) => (
  <Icon {...props}>
    <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 7.3102H0.928577V8.45306H24V7.3102ZM24.0001 0.689819H0.928633V1.81599H24.0001V0.689819ZM0.928528 15.1043H18.5714V13.9776H0.928528V15.1043ZM21.2857 11.1674V19.3102L28.0714 15.2388L21.2857 11.1674Z" fill="#89DBFF" />
    </svg>
  </Icon>
);

export default Playlist;
