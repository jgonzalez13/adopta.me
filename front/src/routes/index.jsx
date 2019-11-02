import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';

// ! State Global
import User from '../containers/User.Container';

// ? Components
const HomeView = lazy(() => import('../components/views/Home.container'));

const TestView = lazy(() => import('../components/views/protected/Test'));

const AppRoutes = () => {
  let user = User.useContainer();
  return (
    <Suspense fallback={<div>Cargando... </div>}>
      <BrowserRouter>
        <Switch>
          <user.PublicRoute path="/" component={HomeView} exact />
          <user.PrivateRoute path="/roles" component={TestView} exact />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
