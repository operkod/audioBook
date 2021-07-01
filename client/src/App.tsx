import './style/App.scss'
import { Provider } from 'react-redux'
import store from './redux/store'
import AppRouters from 'components/AppRouter'
import Actions from 'redux/action/user'

import 'localization'

// TODO когда добавишь на сервере сохранение в профиле книг удалить dispatch
// store.dispatch(ActionsBooks.requestBook())
store.dispatch(Actions.userProfile())

const App = () => {
	return (
		<Provider store={store}>
			<AppRouters />
		</Provider>
	)
}

export default App
