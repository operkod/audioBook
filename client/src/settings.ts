import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { throttle } from 'lodash';

const StalerScreen = ({ children }: any) => {
  const dispatch = useDispatch();
  const changeScreen = useCallback(
    ({ target }: any) => {
      const { innerHeight, innerWidth } = target;
      dispatch({ type: 'SETTINGS_SET_DATA', payload: { width: innerWidth, height: innerHeight } });
    },
    [dispatch],
  );

  const throttleResizeHandler = useMemo(() => throttle(changeScreen, 300), [changeScreen]);

  React.useEffect(() => {
    window.addEventListener('resize', throttleResizeHandler);
    return () => window.removeEventListener('resize', throttleResizeHandler);
  }, [throttleResizeHandler]);

  React.useEffect(() => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    dispatch({ type: 'SETTINGS_SET_DATA', payload: { width, height } });
  }, [dispatch]);
  return children;
};

export default StalerScreen;
