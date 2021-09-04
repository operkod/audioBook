/*eslint-disable */
import React, { useCallback } from 'react';
import { Menu as MenuAntd, Dropdown, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuProps } from 'components/Menu';
import routers from 'const/routers';

import userIcon from 'assets/img/user.svg';
import { useTranslation } from 'react-i18next';
import { removeToken } from 'helpers/token';

const MobileMenu: React.FC<MenuProps> = ({ isAuth, avatar, logout }) => {
  const { t } = useTranslation();
  const logOut = useCallback(() => {
    removeToken();
    logout();
  }, []);
  return (
    <MenuAntd>
      {!isAuth ? (
        <>
          <Dropdown
            overlay={
              <MenuAntd>
                <MenuAntd.Item>
                  <Link to={routers.getSignin()}>
                    <Button block type="primary">
                      {t('auth.button.signIn')}
                    </Button>
                  </Link>
                </MenuAntd.Item>
                <MenuAntd.Item>
                  <Link to={routers.getSignup()}>
                    <Button type="primary">{t('auth.button.registration')}</Button>
                  </Link>
                </MenuAntd.Item>
              </MenuAntd>
            }
            placement="bottomRight"
          >
            <Avatar className="avatar" size="large" icon={<img src={avatar || userIcon} alt="UserAvatar" />} />
          </Dropdown>
        </>
      ) : (
        <Dropdown
          overlay={
            <>
              <MenuAntd>
                <MenuAntd.Item>
                  <Link className="nav-link" to={routers.getAddBook()}>
                    {t('menu.addBook')}
                  </Link>
                </MenuAntd.Item>
                <MenuAntd.Item>
                  <Link to={routers.getProfile()}>{t('menu.profile')}</Link>
                </MenuAntd.Item>
                <MenuAntd.Item onClick={logOut} danger>
                  {t('menu.logout')}
                </MenuAntd.Item>
              </MenuAntd>
            </>
          }
          placement="bottomRight"
        >
          <Avatar className="avatar" size="large" icon={<img src={avatar || userIcon} alt="UserAvatar" />} />
        </Dropdown>
      )}
    </MenuAntd>
  );
};

export default React.memo(MobileMenu);
