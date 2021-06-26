import './style/App.scss'
import React from 'react'
import { Provider } from 'react-redux'
import store from "./redux/store"
import AppRouters from 'components/AppRouter'
import Actions from 'redux/action/user'
import { Actions as ActionsBooks } from 'redux/action/books'
import 'localization'
import { Suspense } from 'react'
import { Loader } from 'components'
import styled, { ThemeProvider } from 'styled-components'



// TODO когда добавишь на сервере сохранение в профиле книг удалить dispatch 
store.dispatch(ActionsBooks.requestBook({}))
store.dispatch(Actions.userProfile())
export type ThemeType = typeof themeWhite
const themeWhite = {
  color: {
    primary: '#000',
    secondary: 'green'
  },
  backgroundColor: {
    primary: '#fff',
    secondary: '#eef0f1'
  }
}
const themeBlack = {
  color: {
    primary: '#fff',
    secondary: 'green'
  },
  backgroundColor: {
    primary: '#353333',
    secondary: '#5e5a5a'
  }
}
const App = () => {
  const [theme, setTheme] = React.useState(false)
  React.useEffect(() => {
    document.addEventListener('click', () => setTheme(!theme))
    return () => document.removeEventListener('click', () => setTheme(!theme))
  }, [theme])

  return (
    <Suspense fallback={Loader}>
      <ThemeProvider theme={theme ? themeWhite : themeBlack}>
        <Provider store={store}>
          <AppRouters />
        </Provider>
      </ThemeProvider>
    </Suspense>
  )
}

export default App

