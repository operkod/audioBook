import './style/App.scss'
import { Provider } from 'react-redux'
import store from "./redux/store"
import AppRouters from 'components/AppRouter'
import Actions from 'redux/action/user'
import { Actions as ActionsBooks } from 'redux/action/books'
import 'localization'
import { Suspense } from 'react'
import { Loader } from 'components'
import styled, { ThemeProvider } from 'styled-components'


const theme = {
  color: {
    primary: 'red',
    secondary: 'green'
  }
}


// TODO когда добавишь на сервере сохранение в профиле книг удалить dispatch 
store.dispatch(ActionsBooks.requestBook({}))
store.dispatch(Actions.userProfile())
const App = () => {
  return (
    <Suspense fallback={Loader}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouters />
        </Provider>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
