import React from 'react';
import { useSelector } from 'react-redux';
import { getScreenHeight, getScreenWidth } from 'redux/selectors';

export const WIDTH_SIDEBAR = 300;

const Sidebar = () => {
  const screenWidth = useSelector(getScreenWidth);
  const ScreenHeight = useSelector(getScreenHeight);
  const widthPercent = React.useMemo(() => (WIDTH_SIDEBAR * 100) / screenWidth, [screenWidth]);

  return (
    <div
      style={{
        width: `${screenWidth > 1200 ? widthPercent : 0}%`,
        backgroundColor: 'red',
        height: ScreenHeight < 400 ? 400 : ScreenHeight - 60,
      }}
    >
      /
    </div>
  );
};

export default Sidebar;
