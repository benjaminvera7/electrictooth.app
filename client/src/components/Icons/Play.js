import React from 'react';
import Icon from '../Icon';
import theme from 'theme.js';

// const Play = (props) => (
//   <Icon {...props}>
//     <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M0 0V15.2727L12 7.63636L0 0Z" fill="white" />
//     </svg>
//   </Icon>
// );
const Play = (props) => (
  <Icon {...props}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='white'
      viewBox='0 0 24 24'
    >
      <path d='M8 5v14l11-7z' />
    </svg>
  </Icon>
);

export default Play;
