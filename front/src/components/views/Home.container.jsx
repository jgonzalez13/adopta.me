import React from 'react';
import useForm from 'react-hook-form';

const Home = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        ref={register({
          required: 'Required'
        })}
      />
      {errors.email && errors.email.message}

      <input
        name="username"
        type="password"
        ref={register({
          required: 'Required'
        })}
      />
      {errors.username && errors.username.message}

      <button type="submit">Submit</button>
    </form>
  );
};
export default Home;
