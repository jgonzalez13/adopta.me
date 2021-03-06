import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';

// ! State Global
import User from '../containers/User.Container';

// ? Components
import NavBar from '../components/layout/NavBar.component';

import Spinner from '../shared/Spinner.component';

const HomeView = lazy(() => import('../components/views/Home/Home.container'));

const ChatListView = lazy(() =>
  import('../components/views/protected/ChatList/ChatList.container')
);

const Chat = lazy(() =>
  import('../components/views/protected/Chat/Chat.container')
);

const SwipeView = lazy(() =>
  import('../components/views/protected/Swipe/Swipe.container')
);

const ProfileView = lazy(() =>
  import('../components/views/protected/Profile/Profile.container')
);

const AppRoutes = () => {
  let user = User.useContainer();
  return (
    <Suspense fallback={<Spinner size={130} />}>
      <BrowserRouter>
        {user.authentication ? <NavBar /> : null}
        <Switch>
          <user.PublicRoute path="/" component={HomeView} exact />∫
          <user.PrivateRoute path="/chat" component={ChatListView} exact />
          <user.PrivateRoute path="/chat/:id" component={Chat} exact />
          <user.PrivateRoute path="/swipe" component={SwipeView} exact />
          <user.PrivateRoute path="/profile" component={ProfileView} exact />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
