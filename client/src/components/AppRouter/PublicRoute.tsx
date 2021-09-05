import routers from 'const/routers';
import { getToken } from 'helpers/token';
import useUserData from 'hooks/api/useUserData';
import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IPublicRoute {
  component: () => any;
  exact?: boolean;
  path: string;
  url?: string;
}

const PublicRoute: FC<IPublicRoute> = ({ component: Component, ...rest }) => {
  const { userData } = useUserData();
  if (!getToken() && !userData.id) {
    return <Route exact={rest.exact} path={rest.path} render={() => <Component />} />;
  }
  return <Redirect to={routers.getBase()} />;
};

export default PublicRoute;
