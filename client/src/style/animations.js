import { css, keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
export const FADE_IN = css`
  animation ${fadeIn} 300ms ease-in-out;
`;

const rotate = keyframes`
  from {
    rotate(0deg);
  }
  to {
    rotate(360deg);
  }
`;

export const ROTATE = css`
  animation ${rotate} 2s linear infinite;
`;
