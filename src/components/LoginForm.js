import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/userActions';
import { initializeBlogs } from '../actions/blogsActions';
import { setNotification } from '../actions/notifcationActions';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useField } from '../hooks';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');

  const dispatch = useDispatch();


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userToLogin = await loginService.login({
        username: username.attributes.value, password: password.attributes.value,
      });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(userToLogin),
      );

      blogService.setToken(userToLogin.token);
      dispatch(setUser(userToLogin));
      dispatch(initializeBlogs());
      username.reset();
      password.reset();
    } catch (exception) {
      dispatch(setNotification(
        'error',
        exception.response.data.error,
        3000,
      ));
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input {...username.attributes} />
        </div>
        <div>
          Password:
          <input {...password.attributes}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
