import './Avatar.scss';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getScreenWidth } from 'redux/selectors';
import useUserData from 'hooks/api/useUserData';
import WebMenu from './components/WebMenu';
import MobileMenu from './components/MobileMenu';

// const width: number = window.innerWidth
const mobileWidth: number = 850;

export type MenuProps = {
  isAuth: boolean;
  avatar: string;
  logout: Function;
};

const Menu = () => {
  const width = useSelector(getScreenWidth);
  const { userData, logout } = useUserData();
  const isShowMenuMobile = useMemo(() => mobileWidth > width, [width]);

  return (
    <>
      {isShowMenuMobile ? (
        <MobileMenu isAuth={!!userData.id} avatar={userData.avatar} logout={logout} />
      ) : (
        <WebMenu isAuth={!!userData.id} avatar={userData.avatar} logout={logout} />
      )}
    </>
  );
};

export default Menu;
