import React from 'react';
import Icon from '../Icon';

const Download = (props) => (
  <Icon {...props}>
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 0.5V12.125" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" />
      <path d="M4.5 7.625L9 12.125L13.5 7.625" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" />
      <path d="M1.125 15.5H16.875" stroke="#89DBFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" />
    </svg>
  </Icon>
);
// const Download = (props) => (
//   <Icon {...props}>
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       fill={props.color ? props.color : '#fff'}
//       viewBox='0 0 24 24'
//     >
//       <path
//         d='M19,9 L15,9 L15,3 L9,3 L9,9 L5,9 L12,16 L19,9 L19,9 Z M5,18 L5,20 L19,20 L19,18 L5,18 L5,18 Z'
//         id='Shape'
//       ></path>
//     </svg>
//   </Icon>
// );

export default Download;
