import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({ usersToShow }) => (
  <div>
    <h1>Users</h1>
    <table>
      <tr>
        <th>Name</th>
        <th>Blogs Created</th>
      </tr>
      {usersToShow.map((user) => (
        <tr key={user.id}>
          <td><Link to={`users/${user.id}`}>{user.name}</Link></td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </table>
  </div>
);

const usersToShow = ({ users }) => users.sort((a, b) => b.blogs.length - a.blogs.length);

const mapStateToProps = (state) => ({
  usersToShow: usersToShow(state),
});


const ConnectedUsers = connect(mapStateToProps)(Users);

export default ConnectedUsers;
