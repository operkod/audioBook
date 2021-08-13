import './Avatar.scss';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getAuth, getAvatar, getScreenWidth } from 'redux/selectors';
import WebMenu from './components/WebMenu';
import MobileMenu from './components/MobileMenu';

// const width: number = window.innerWidth
const mobileWidth: number = 850;

export type MenuProps = {
  isAuth: boolean;
  avatar: string;
};

const Menu = () => {
  const width = useSelector(getScreenWidth);
  const isAuth = useSelector(getAuth);
  const avatar = useSelector(getAvatar);

  // :>)
  const isShowMenuMobile = useMemo(() => mobileWidth > width, [width]);

  return (
    <>
      {isShowMenuMobile ? <MobileMenu isAuth={isAuth} avatar={avatar} /> : <WebMenu isAuth={isAuth} avatar={avatar} />}
    </>
  );
};

export default Menu;
