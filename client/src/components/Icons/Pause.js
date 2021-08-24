import React from 'react';
import Icon from '../Icon';
//import theme from 'theme.js';

// const Pause = (props) => (
//   <Icon {...props}>
//     <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M5.19999 0H0V19.5H5.19999V0Z" fill="white" />
//       <path d="M16.8999 0H11.7V19.5H16.8999V0Z" fill="white" />
//     </svg>
//   </Icon>
//);
const Pause = (props) => (
  <Icon {...props}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='white'
      viewBox='0 0 24 24'
    >
      <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
    </svg>
  </Icon>
);

export default Pause;
