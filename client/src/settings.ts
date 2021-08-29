import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SetSettings } from 'redux/action/settings';

const StalerScreen = ({ children }: any) => {
  const dispatch = useDispatch();

  const resizeHandler = useCallback(() => {
    const screenDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    dispatch(SetSettings(screenDimensions));
  }, [dispatch]);

  React.useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  React.useEffect(() => {
    const screenDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    dispatch(SetSettings(screenDimensions));
  }, [dispatch]);

  return children;
};

export default StalerScreen;
