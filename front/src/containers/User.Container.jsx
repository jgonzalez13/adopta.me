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
      render={props =>
        authentication ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  console.log(authentication);

  const PublicRoute = ({ component: Component }) => (
    <Route
      render={props =>
        !authentication ? <Component {...props} /> : <Redirect to="/swipe" />
      }
    />
  );

  useEffect(() => {
    if (token !== '') {
      localStorage.setItem('token', token);
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      setAuthentication(true);
    }
  }, []);

  return {
    lat,
    lng,
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
