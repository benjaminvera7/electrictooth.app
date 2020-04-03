import React from 'react';
import Icon from '../Icon';

const PlaylistAdd = (props) => (
  <Icon {...props}>
    <svg
      width='20px'
      height='14px'
      viewBox='0 0 20 14'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g id='AV' transform='translate(-194.000000, -246.000000)'>
          <g id='ic_playlist_add' transform='translate(192.000000, 240.000000)'>
            <g id='Icon-24px'>
              <polygon id='Shape' points='0 0 24 0 24 24 0 24'></polygon>
              <path
                d='M14,10 L2,10 L2,12 L14,12 L14,10 L14,10 Z M14,6 L2,6 L2,8 L14,8 L14,6 L14,6 Z M18,14 L18,10 L16,10 L16,14 L12,14 L12,16 L16,16 L16,20 L18,20 L18,16 L22,16 L22,14 L18,14 L18,14 Z M2,16 L10,16 L10,14 L2,14 L2,16 L2,16 Z'
                id='Shape'
                fill={props.color ? props.color : '#fff'}
              ></path>
            </g>
          </g>
          <g id='NEW-2.1' transform='translate(70.000000, 46.000000)'></g>
        </g>
      </g>
    </svg>
  </Icon>
);

export default PlaylistAdd;
