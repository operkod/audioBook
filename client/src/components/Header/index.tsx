/* eslint-disable @typescript-eslint/no-shadow */
// TODO: Настроить Eslint для области видимости
import './Header.scss';
import React from 'react';
import { Input } from 'antd';
import { Menu } from 'components';
import { Link, useHistory } from 'react-router-dom';
import { getSearchValue } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from 'redux/action/books';
import routers from 'const/routers';
import { useTranslation } from 'react-i18next';
import Language from 'components/Language';
import logoIcon from 'assets/img/logo.svg';
// import { createUseStyles } from 'react-jss';

const { Search } = Input;

const Header = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const value = useSelector(getSearchValue);
  const dispatch = useDispatch();

  const handleSearch = (value: string) => {
    dispatch(Actions.searchValue(value.trim()));
    history.push(routers.getBase());
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-content__logo">
            <Link to={routers.getBase()}>
              <img src={logoIcon} alt="Books" width="100%" />
            </Link>
          </div>
          <div className="search">
            <Search placeholder={t('search')} onSearch={handleSearch} defaultValue={value || ''} enterButton />
          </div>
          <div className="nav">
            <Menu />
          </div>
          <Language />
          {/* <Switch checked={valueChecked} onChange={onChangeTheme} /> */}
        </div>
      </div>
    </div>
  );
};
export default Header;
