import React from 'react';

const LoginForm = ({ username, handleUsernameChange, password, handlePasswordChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
