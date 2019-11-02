import React, { useState } from 'react';
import { mdiArrowLeftCircle } from '@mdi/js';
import { Icon } from '@mdi/react';
import FormLogin from '../FormLogin.component';

const Home = () => {
  const [loginActive, setLoginActive] = useState(false);

  return (
    <div className="background-login">
      {loginActive ? (
        <button
          type="submit"
          className="btn btn--white btn--animated max-width-100 animateToLeft"
        >
          <Icon
            onClick={() => setLoginActive(false)}
            path={mdiArrowLeftCircle}
            size={1}
            color="#fc6476"
          />
        </button>
      ) : null}
      <div className="background-login_icono">
        <div className="logo"></div>
      </div>
      <div className="background-login-banner">
        {loginActive ? (
          <FormLogin />
        ) : (
          <div className="btns-container">
            <button
              onClick={() => setLoginActive(true)}
              className="btn btn--white btn--animated margin-bottom-30"
            >
              Iniciar sesion
            </button>
            <button className="btn btn--white btn--animated">
              Registrarse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
