import React, { useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalStyles } from 'App';
import { Menu } from 'components';
import { Link, useHistory } from 'react-router-dom';
// import { Actions } from 'redux/action/books';
import routers from 'const/routers';
import { useTranslation } from 'react-i18next';
import Language from 'components/Language';
import logoIcon from 'assets/img/logo.svg';
import { setParamsQueryBooks } from 'Actions';
import { StateType } from 'redux/reducer';

const { Search } = Input;

const Header = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const search = useSelector((state: StateType) => state.queryParams.search);
  const [valueForm, setValueForm] = useState(search);

  const searchHandler = (value: string) => {
    dispatch(setParamsQueryBooks({ search: value.trim(), page: 0 }));
    history.push(routers.getBase());
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValueForm(value);
  };
  return (
    <div className={styles.header}>
      <div className={globalStyles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link to={routers.getBase()}>
              <img src={logoIcon} alt="Books" width="100%" />
            </Link>
          </div>
          <div className={styles.search}>
            <Search
              placeholder={t('search')}
              onSearch={searchHandler}
              defaultValue={search}
              value={valueForm}
              onChange={changeHandler}
              enterButton
            />
          </div>
          <div className={styles.nav}>
            <Menu />
          </div>
          <Language />
          {/* <Switch checked={valueChecked} onChange={onChangeTheme} /> */}
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#eef0f1',
    boxShadow: '0px 0px 20px 0px #c2bfbf',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  logo: {
    width: '50px',
  },
  nav: {
    '& a': {
      marginLeft: '2rem',
    },
  },
  search: {
    marginLeft: 'auto',
    width: '300px',
  },
});

export default Header;
