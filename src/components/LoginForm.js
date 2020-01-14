import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { setUser } from '../actions/userActions';
import { initializeBlogs } from '../actions/blogsActions';
import { setNotification } from '../actions/notifcationActions';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useField } from '../hooks';

const LoginForm = (props) => {
  const username = useField('text');
  const password = useField('password');

  // const dispatch = useDispatch();

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
      props.setUser(userToLogin);
      props.initializeBlogs();

      username.reset();
      password.reset();
    } catch (exception) {
      props.setNotification('error', exception.response.data.error, 3000);
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

const ConnectedLoginForm = connect(null, { setUser, initializeBlogs, setNotification })(LoginForm);

export default ConnectedLoginForm;
