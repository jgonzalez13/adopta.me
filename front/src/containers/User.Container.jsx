import React, { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import { Route, Redirect } from 'react-router-dom';

const initialState = {
  emai: '',
  name: '',
  address: '',
  authentication: false,
  token: '',
  photography: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'onLogin':
      return {
        ...state,
        authentication: true
      };
    case 'onLogout':
      return {
        ...state,
        authentication: false
      };
    default: {
      throw Error();
    }
  }
}

function useUser() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const PrivateRoute = ({ component: Component }) => (
    <Route
      render={() =>
        state.authentication === true ? <Component /> : <Redirect to="/" />
      }
    />
  );

  const PublicRoute = ({ component: Component }) => (
    <Route
      render={() =>
        state.authentication === false ? (
          <Component />
        ) : (
          <Redirect to="/roles" />
        )
      }
    />
  );

  return { state, dispatch, PrivateRoute, PublicRoute };
}

const User = createContainer(useUser);

export default User;
