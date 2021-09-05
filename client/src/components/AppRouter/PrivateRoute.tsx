import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import routers from 'const/routers';
import useUserData from 'hooks/api/useUserData';
import { getToken } from 'helpers/token';

type PrivateRouteType = {
  component: () => any;
  exact?: boolean;
  path: string;
};

const PrivateRoute: FC<PrivateRouteType> = ({ component: Component, ...rest }) => {
  const { userData } = useUserData();
  if (getToken() && !!userData.id) {
    return <Route exact={rest.exact} path={rest.path} render={() => <Component />} />;
  }
  return <Redirect to={routers.getSignin()} />;
};

export default PrivateRoute;
