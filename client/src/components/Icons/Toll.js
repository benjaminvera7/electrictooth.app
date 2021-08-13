import React from 'react';
import Icon from '../Icon';

// const Toll = (props) => (
//   <Icon {...props}>
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       width={props.width ? props.width : '22px'}
//       height={props.height ? props.height : '22px'}
//       fill='#EFEA5A'
//       viewBox={props.viewBox ? props.viewBox : '0 0 24 24'}
//     >
//       <path d='M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z' />
//     </svg>
//   </Icon>
// );
const Toll = (props) => (
  <Icon {...props}>
    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5.78036V12.4061C1 15.1508 5.5276 17.3753 11.1119 17.3753C16.6962 17.3753 21.2238 15.1508 21.2238 12.4061V5.78036" stroke="#89DBFF" stroke-miterlimit="10" />
      <path d="M1 12.4049V19.0306C1 21.7753 5.5276 23.9999 11.1119 23.9999C16.6962 23.9999 21.2238 21.7753 21.2238 19.0306V12.4049" stroke="#89DBFF" stroke-miterlimit="10" />
      <path d="M11.1119 10.7491C16.6965 10.7491 21.2238 8.52428 21.2238 5.77982C21.2238 3.03537 16.6965 0.810547 11.1119 0.810547C5.52725 0.810547 1 3.03537 1 5.77982C1 8.52428 5.52725 10.7491 11.1119 10.7491Z" stroke="#89DBFF" stroke-miterlimit="10" stroke-linecap="square" />
    </svg>
  </Icon>
);

export default Toll;
