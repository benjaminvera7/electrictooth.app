import { css, keyframes } from '@emotion/core';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
export const FADE_IN = css`
  animation ${fadeIn} 300ms ease-in-out;
`;
