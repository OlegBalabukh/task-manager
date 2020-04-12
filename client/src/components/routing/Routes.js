import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from '../layout/NotFoundPage';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  );
};

export default Routes;
