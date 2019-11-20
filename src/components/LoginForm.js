import React from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ username, setUsername, password, setPassword, setUser, setNotificationMessage }) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user),
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage({ messageText: exception.response.data.error, error: true });
      setTimeout(() => {
        setNotificationMessage({ messageText: null });
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
