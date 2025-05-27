import { useEffect, useState } from 'react';

import { CONSTANTS } from '@/config/constants';

function getWindowDimensions() {
  if (typeof window === 'undefined')
    return {
      width: 0,
      height: 0,
    };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
    isTablet: width <= CONSTANTS.BREAKPOINT.TABLET,
    isMobile: width <= CONSTANTS.BREAKPOINT.MOBILE,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
