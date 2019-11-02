import React from 'react';
import useForm from 'react-hook-form';
import User from '../../containers/User.Container';
import useApi from '../../services/useApi';

const Home = () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        ref={register({
          required: 'El campo esta vacio'
        })}
      />
      {errors.email && errors.email.message}

      <input
        name="password"
        type="password"
        ref={register({
          required: 'El campo esta vacio'
        })}
      />
      {errors.username && errors.username.message}

      <button type="submit">Submit</button>
    </form>
  );
};
export default Home;
