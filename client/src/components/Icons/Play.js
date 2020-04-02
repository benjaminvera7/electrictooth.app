import React from 'react';
import Icon from '../Icon';
import theme from 'theme.js';

const Play = (props) => (
  <Icon {...props}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill={`${theme.colors.etGreen}`}
      viewBox='0 0 24 24'
    >
      <path d='M8 5v14l11-7z' />
    </svg>
  </Icon>
);

export default Play;
