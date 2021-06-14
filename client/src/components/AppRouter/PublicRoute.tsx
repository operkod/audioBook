import routers from 'const/routers'
import { FC, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { getAuth } from 'redux/selectors'

interface IPublicRoute {
  component: () => ReactElement
  exact?: boolean
  computedMatch?: object
  path: string
  url?: string
}

const PublicRoute: FC<IPublicRoute> = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(getAuth)
  if (!isAuth) {
    return <Route
      exact={rest.exact}
      path={rest.path}
      render={() => <Component />}
    />
  }
  return <Redirect to={routers.getBase()} />
}

export default PublicRoute