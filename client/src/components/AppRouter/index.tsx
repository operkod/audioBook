import { Switch, Redirect, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import routers from 'const/routers'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Home from 'page/Home'
import { Layout } from 'components'
import { lazy, Suspense } from 'react'
import Loader from 'components/Loader'

const Signin = lazy(() => import('page/Signin'))
const Signup = lazy(() => import('page/Signup'))
const Profile = lazy(() => import('page/Profile'))
const AddBook = lazy(() => import('page/AddBook'))

const AppRouters = () => {
	return (
		<Router>
			<Layout>
				<Suspense fallback={<Loader />}>
					<Switch>
						<PublicRoute
							exact
							path={routers.getSignin()}
							component={() => <Signin />}
						/>
						<PublicRoute
							exact
							path={routers.getSignup()}
							component={() => <Signup />}
						/>

						<PrivateRoute
							exact
							path={routers.getAddBook()}
							component={() => <AddBook />}
						/>
						<PrivateRoute
							exact
							path={routers.getProfile()}
							component={() => <Profile />}
						/>
						<Route path={routers.getBase()} component={() => <Home />} />
						<Route path='*'>
							<Redirect to={routers.getBase()} />
						</Route>
					</Switch>
				</Suspense>
			</Layout>
		</Router>
	)
}

export default AppRouters
