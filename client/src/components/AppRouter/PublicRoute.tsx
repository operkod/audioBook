import routers from 'const/routers'
import { getToken } from 'helpers/token'
import { FC, ReactElement } from 'react'
import { Route, Redirect } from 'react-router-dom'

interface IPublicRoute {
  component: () => ReactElement | any
  exact?: boolean
  computedMatch?: object
  path: string
  url?: string
}

const PublicRoute: FC<IPublicRoute> = ({ component: Component, ...rest }) => {
  if (getToken() === null) {
    return <Route {...rest} render={(props) => {
      //@ts-ignore
      return <Component {...props} />
    }} />
  }
  return <Redirect to={routers.getBase()} />
}

export default PublicRoute