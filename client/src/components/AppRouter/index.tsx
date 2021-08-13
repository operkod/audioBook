import React, { lazy, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import Home from 'page/Home';
import routers from 'const/routers';
import Loader from 'components/Loader';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const Signin = lazy(() => import('page/Signin'));
const Signup = lazy(() => import('page/Signup'));
const Profile = lazy(() => import('page/Profile'));
const AddBook = lazy(() => import('page/AddBook'));

const AppRouters = () => (
  <Router>
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute exact path={routers.getSignin()} component={() => <Signin />} />
          <PublicRoute exact path={routers.getSignup()} component={() => <Signup />} />
          <PrivateRoute exact path={routers.getAddBook()} component={() => <AddBook />} />
          <PrivateRoute exact path={routers.getProfile()} component={() => <Profile />} />
          <Route path={routers.getBase()} component={() => <Home />} />
          <Route path="*">
            <Redirect to={routers.getBase()} />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  </Router>
);

export default AppRouters;
