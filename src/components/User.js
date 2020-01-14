import React from 'react';
import { connect } from 'react-redux';

const User = ({ user }) => {

  if (user === undefined) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find((u) => u.id === ownProps.id),
});

const ConnectedUser = connect(mapStateToProps)(User);

export default ConnectedUser;
