import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import routers from 'const/routers';
import { getAuth } from 'redux/selectors';
import { useSelector } from 'react-redux';

type PrivateRouteType = {
  component: () => any;
  exact?: boolean;
  path: string;
};

const PrivateRoute: FC<PrivateRouteType> = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(getAuth);
  if (!isAuth) {
    return <Redirect to={routers.getSignin()} />;
  }
  return <Route exact={rest.exact} path={rest.path} render={() => <Component />} />;
};

export default PrivateRoute;
