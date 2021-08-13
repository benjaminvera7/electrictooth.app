import React from 'react';
import Icon from '../Icon';
import theme from 'theme.js';

// const Home = (props) => (
//   <Icon {...props}>
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       fill={props.active ? theme.colors.etGreen : '#b3b3b3'}
//       viewBox='0 0 24 24'
//       id='home'
//     >
//       <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
//     </svg>
//   </Icon>
// );
const Home = (props) => (
  <Icon {...props}>
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <path d="M13.0119 25.1667H13.5119V24.6667V17.9167H17.3452V24.6667V25.1667H17.8452H23.8869H24.3869V24.6667V15.5H27.5119H28.8149L27.8464 14.6284L15.763 3.75335L15.4285 3.45232L15.0941 3.75335L3.01073 14.6284L2.04224 15.5H3.34521H6.47021V24.6667V25.1667H6.97021H13.0119Z" stroke="#89DBFF" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="29" height="29" fill="white" transform="translate(0.928543 0.5)" />
        </clipPath>
      </defs>
    </svg>

  </Icon>
);

export default Home;
