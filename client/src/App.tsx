import React from 'react';
import './style/App.scss';
import { Provider } from 'react-redux';
import AppRouters from 'components/AppRouter';
import Actions from 'redux/action/user';
import { Provider as ReduxQueryProvider } from 'redux-query-react';
import 'localization';
import StalerScreen from 'settings';
import { createUseStyles } from 'react-jss';
import store from 'redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getQueries = (state: any) => state.queries;

// TODO: когда добавишь на сервере сохранение в профиле книг удалить dispatch
// store.dispatch(ActionsBooks.requestBook())
store.dispatch(Actions.userProfile());

const App = () => {
  useStyles();
  return (
    <Provider store={store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        <StalerScreen>
          <ToastContainer />
          <AppRouters />
        </StalerScreen>
      </ReduxQueryProvider>
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
      '&::-webkit-scrollbar': {
        width: '10px',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: '5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset',
        backgroundColor: '#f9f9fd',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        background: 'linear-gradient(180deg, #00c6fb, #005bea)',
      },
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

export const useGlobalStyles = createUseStyles({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 10px',
  },
});

export default App;
