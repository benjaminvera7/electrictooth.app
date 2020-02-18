import { useState, useEffect } from 'react';

export default function useWindowSize() {

  function isClient() {
    return typeof window === 'object'
  }

  function getSize() {
    return window.innerWidth < 1100
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    // eslint-disable-next-line
    if (!isClient()) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}