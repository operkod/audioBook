import React from 'react';
import './style/App.scss';
import { Provider } from 'react-redux';
import AppRouters from 'components/AppRouter';
import Actions from 'redux/action/user';
import io from 'socket.io-client';
import 'localization';
import StalerScreen from 'settings';
import { createUseStyles } from 'react-jss';
import store from './redux/store';

const socket = io();
// TODO: когда добавишь на сервере сохранение в профиле книг удалить dispatch
// store.dispatch(ActionsBooks.requestBook())
store.dispatch(Actions.userProfile());

const App = () => {
  useStyles();
  React.useEffect(() => {
    socket.emit('event', 'asdasdsa');
  }, []);
  return (
    <Provider store={store}>
      <StalerScreen>
        <AppRouters />
      </StalerScreen>
    </Provider>
  );
};

const useStyles = createUseStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    body: {
      minHeight: '100vh',
      fontFamily: 'LatoRegular, sans-serif',
      fontSize: '13px',
    },
    h1: {
      margin: '15px 0',
    },
    h2: {
      fontFamily: 'MullerBold, sans-serif',
      fontSize: '40px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '46px',
    },
    h3: {
      fontFamily: 'MullerBold, sans-serif',
    },
    h4: {
      margin: '10px 0',
    },
    a: {
      fontFamily: 'MullerRegular, sans-serif',
      textDecoration: 'none',
      color: 'inherit',
      '&:focus': {
        outline: 'none',
      },
    },
    button: {
      fontFamily: 'MullerRegular, sans-serif',
      background: 'none',
      border: 0,
      '&:focus': {
        outline: 'none',
      },
    },
    input: {
      fontFamily: 'LatoRegular, sans-serif',
      fontSize: '20px',
      border: 0,
      '&:focus': {
        outline: 'none',
      },
      '&:invalid': {
        boxShadow: 'none',
      },
    },
    textarea: {
      fontFamily: 'LatoRegular, sans-serif',
      fontSize: '20px',
      border: 0,
      '&:focus': {
        outline: 'none',
      },
    },
  },
});

export default App;
