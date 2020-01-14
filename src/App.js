import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

import { initializeBlogs, clearBlogs } from './actions/blogsActions';
import { initializeUsers, clearUsers } from './actions/usersActions';
import { setUser, clearUser } from './actions/userActions';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (props.user === null && loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON);
      props.setUser(savedUser);
      // Caused errors in testing
      // blogService.setToken(savedUser.token);
    }

    props.initializeBlogs();
    props.initializeUsers();
  }, [props]);

  const handleLogout = (event) => {
    event.preventDefault();
    props.clearUser();
    props.clearBlogs();
    props.clearUsers();
    window.localStorage.removeItem('loggedBloglistUser');
  };

  if (props.user === null) {
    return (
      <div>
        <h2>Login to the blog list</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Router>
        <NavBar username={props.user.name} handleLogout={handleLogout} />
        <h1>Blogs</h1>
        <Notification />
        <Togglable buttonLabel="Add Blog">
          <BlogForm />
        </Togglable>
        <Route exact path="/" render={() => <BlogList />} />
        <Route exact path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} />} />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />

      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  {
    initializeBlogs,
    clearBlogs,
    setUser,
    clearUser,
    initializeUsers,
    clearUsers,
  },
)(App);
