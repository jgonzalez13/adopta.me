import React from 'react';
import useForm from 'react-hook-form';
import User from '../../containers/User.Container';
import useApi from '../../services/useApi';
import { Icon } from '@mdi/react';
import { mdiLoginVariant } from '@mdi/js';

const FormLogin = () => {
  const { handleSubmit, register, errors } = useForm();

  let user = User.useContainer();
  const fetchData = useApi();

  const onSubmit = async values => {
    console.log(values);
    user.dispatch({ type: 'onLogin' });
    const response = await fetchData('POST', '/auth', JSON.stringify(values));

    console.log(response);
  };

  return (
    <form className="formConatiner" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group margin-bottom-20">
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          name="email"
          ref={register({
            required: 'El campo esta vacio'
          })}
        />
        {errors.email && errors.email.message}
      </div>

      <div className="form-group margin-bottom-20">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          name="password"
          type="password"
          ref={register({
            required: 'El campo esta vacio'
          })}
        />
        {errors.username && errors.username.message}
      </div>
      <div className="d-flex align-item-center">
        <button type="submit" className="btn btn--pink btn--animated">
          <Icon
            className="margin-right-15px"
            path={mdiLoginVariant}
            size={1}
            color="#fff"
          />
          Ingresar
        </button>
      </div>
    </form>
  );
};
export default FormLogin;
