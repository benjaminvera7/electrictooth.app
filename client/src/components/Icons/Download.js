import React from 'react';
import Icon from '../Icon';

const Download = (props) => (
  <Icon {...props}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill={props.color ? props.color : '#fff'}
      viewBox='0 0 24 24'
    >
      <path
        d='M19,9 L15,9 L15,3 L9,3 L9,9 L5,9 L12,16 L19,9 L19,9 Z M5,18 L5,20 L19,20 L19,18 L5,18 L5,18 Z'
        id='Shape'
      ></path>
    </svg>
  </Icon>
);

export default Download;
