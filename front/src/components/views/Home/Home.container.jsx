import React, { useState } from 'react';
import { mdiArrowLeftCircle, mdiAccountPlus, mdiLogin } from '@mdi/js';
import { Icon } from '@mdi/react';
import FormLogin from '../FormLogin.component';

const Home = () => {
  const [loginActive, setLoginActive] = useState(false);

  return (
    <div className="background-login">
      {loginActive ? (
        <button
          onClick={() => setLoginActive(false)}
          className="btn btn--pink btn--animated max-width-100 animateToLeft"
        >
          <Icon path={mdiArrowLeftCircle} size={1} color="#fff" />
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
              type="submit"
              onClick={() => setLoginActive(true)}
              className="btn btn--white btn--animated margin-bottom-30"
            >
              <Icon
                className="margin-right-15px"
                onClick={() => setLoginActive(false)}
                path={mdiLogin}
                size={1}
                color="#fc6476"
              />
              Iniciar sesión
            </button>
            <button className="btn btn--white btn--animated">
              <Icon
                className="margin-right-15px"
                onClick={() => setLoginActive(false)}
                path={mdiAccountPlus}
                size={1}
                color="#fc6476"
              />
              Registrarse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
