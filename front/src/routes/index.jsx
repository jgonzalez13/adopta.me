import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';

// ! State Global
import User from '../containers/User.Container';

// ? Components
import NavBar from '../components/views/protected/NavBar/NavBar';

const HomeView = lazy(() => import('../components/views/Home/Home.container'));

const ChatList = lazy(() =>
  import('../components/views/protected/ChatList/ChatList')
);

const Chat = lazy(() => import('../components/views/protected/Chat/Chat'));

const CardSwipe = lazy(() =>
  import('../components/views/protected/Swipe/Swipe.component')
);

const AppRoutes = () => {
  let user = User.useContainer();
  return (
    <Suspense fallback={<div>Cargando... </div>}>
      <BrowserRouter>
        {user.authentication ? <NavBar /> : null}
        <Switch>
          <user.PublicRoute path="/" component={HomeView} exact />∫
          <user.PrivateRoute path="/chat" component={ChatList} exact />
          <user.PrivateRoute path="/chat/:id" component={Chat} exact />
          <user.PrivateRoute path="/swipe" component={CardSwipe} exact />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
