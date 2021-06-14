import './style/App.scss'
import { Provider } from 'react-redux'
import store from "./redux/store"
import AppRouters from 'components/AppRouter'
import Actions from 'redux/action/user'
import { Actions as ActionsBooks } from 'redux/action/books'

store.dispatch(Actions.userProfile())
store.dispatch(ActionsBooks.requestBook({}))
const App = () => {
  return (
    <Provider store={store}>
      <AppRouters />
    </Provider>
  )
}

export default App
