import './style/App.scss'
import { Provider } from 'react-redux'
import store from "./redux/store"
import AppRouters from 'components/AppRouter'

const App = () => {
  return (
    <Provider store={store}>
      <AppRouters />
    </Provider>
  )
}

export default App
