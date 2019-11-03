import React, { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Route, Redirect } from 'react-router-dom';

function useUser() {
  const [token, setToken] = useState('');
  const [authentication, setAuthentication] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const PrivateRoute = ({ component: Component }) => (
    <Route
      render={() =>
        authentication === true ? <Component /> : <Redirect to="/" />
      }
    />
  );

  const PublicRoute = ({ component: Component }) => (
    <Route
      render={() =>
        authentication === false ? <Component /> : <Redirect to="/swipe" />
      }
    />
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      console.log(token);
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthentication(true);
    }
  }, []);

  return {
    token,
    authentication,
    setAuthentication,
    setLng,
    setToken,
    setLat,
    PrivateRoute,
    PublicRoute
  };
}

const User = createContainer(useUser);

export default User;
