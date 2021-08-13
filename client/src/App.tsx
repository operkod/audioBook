import React from 'react';
import './style/App.scss';
import { Provider } from 'react-redux';
import AppRouters from 'components/AppRouter';
import Actions from 'redux/action/user';
import 'localization';
import StalerScreen from 'settings';
import store from './redux/store';

// TODO когда добавишь на сервере сохранение в профиле книг удалить dispatch
// store.dispatch(ActionsBooks.requestBook())
store.dispatch(Actions.userProfile());

const App = () => (
  <Provider store={store}>
    <StalerScreen>
      <AppRouters />
    </StalerScreen>
  </Provider>
);

export default App;
