import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';

// ! State Global
import User from '../containers/User.Container';

// ? Components
import NavBar from '../components/views/protected/NavBar/NavBar';

const HomeView = lazy(() => import('../components/views/Home.container'));

const TestView = lazy(() => import('../components/views/protected/Test'));

const ChatList = lazy(() =>
  import('../components/views/protected/ChatList/ChatList')
);

const AppRoutes = () => {
  let user = User.useContainer();
  return (
    <Suspense fallback={<div>Cargando... </div>}>
      <BrowserRouter>
        {user.state.authentication ? <NavBar /> : null}
        <Switch>
          <user.PublicRoute path="/" component={HomeView} exact />
          <user.PrivateRoute path="/roles" component={TestView} exact />
          <user.PrivateRoute path="/chat" component={ChatList} exact />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
