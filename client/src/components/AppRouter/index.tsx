import { Switch, Redirect, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import routers from 'const/routers'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { Signin, Signup, Profile, Home, AddBook } from 'page'
import { Layout } from 'components'

const AppRouters = () => {
	return (
		<Router>
			<Layout>
				<Switch>
					<PublicRoute exact path={routers.getSignin()} component={Signin} />
					<PublicRoute exact path={routers.getSignup()} component={Signup} />
					<PrivateRoute exact path={routers.getAddBook()} component={AddBook} />
					<PrivateRoute exact path={routers.getProfile()} component={Profile} />
					<Route path={routers.getBase()} component={Home} />
					<Route path='*'>
						<Redirect to={routers.getBase()} />
					</Route>
				</Switch>
			</Layout>
		</Router>
	)
}

export default AppRouters
