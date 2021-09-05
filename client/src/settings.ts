import React from 'react';
import useScreen from 'hooks/api/useScreen';

const StalerScreen = ({ children }: any) => {
  const { setScreenData } = useScreen();

  const resizeHandler = React.useCallback(() => {
    const screenDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setScreenData(screenDimensions);
  }, [setScreenData]);

  React.useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  React.useEffect(() => {
    const screenDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setScreenData(screenDimensions);
  }, [setScreenData]);

  return children;
};

export default StalerScreen;
