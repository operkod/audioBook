import { getToken } from 'helpers/token';
import { FC, ReactElement } from 'react'
import { Route, Redirect } from 'react-router-dom'
import routers from 'const/routers'

interface PrivateRouteType {
  component: () => ReactElement
  exact?: boolean
  computedMatch?: object
  path: string
  url?: string
}

const PrivateRoute: FC<PrivateRouteType> = ({ component: Component, ...rest }) => {
  if (getToken() === null) {
    return <Redirect to={routers.getSignin()} />
  }
  return (
    <Route {...rest} render={(props) => {
      //@ts-ignore
      return <Component  {...props} />
    }} />
  )
}

export default PrivateRoute