import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  username, password, handleSubmit,
}) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.func.isRequired,
    password: PropTypes.func.isRequired,
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
