import './Avatar.scss';
import React, { useMemo } from 'react';
import useScreen from 'hooks/api/useScreen';
import useUserData from 'hooks/api/useUserData';
import WebMenu from './components/WebMenu';
import MobileMenu from './components/MobileMenu';

const mobileWidth: number = 850;

export type MenuProps = {
  isAuth: boolean;
  avatar: string;
  logout: Function;
};

const Menu = () => {
  const { screenData } = useScreen();
  const { userData, logout } = useUserData();
  const isShowMenuMobile = useMemo(() => mobileWidth > screenData.width, [screenData.width]);

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
