import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from './actions/notifcationActions';
import {
  initializeBlogs, addBlog, clearBlogs,
} from './actions/blogsActions';
import { setUser, clearUser } from './actions/userActions';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(savedUser));
      // Caused errors in testing
      // blogService.setToken(savedUser.token);
    }
    const fetchBlogs = async () => {
      try {
        dispatch(initializeBlogs());
      } catch (e) {
        console.log(e);
      }
    };
    fetchBlogs();
  }, [dispatch]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(clearUser());
    dispatch(clearBlogs());
    window.localStorage.removeItem('loggedBloglistUser');
  };

  const blogFormRef = React.createRef();

  const handleAddBlog = async (newObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      await dispatch(addBlog(newObject));
      dispatch(setNotification(
        'success',
        `Added a new blog titled: '${newObject.title}' to the list.`,
        3000,
      ));
    } catch (exception) {
      dispatch(setNotification(
        'error',
        exception.response.data.error,
        3000,
      ));
    }
  };

  if (user === null) {
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
      <h1>Blogs</h1>
      <form>
        {user.name}
        {' '}
        logged in
        {' '}
        <button type="submit" onClick={handleLogout}>Logout</button>
      </form>
      <Notification />
      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <BlogForm
          handleAddBlog={handleAddBlog}
        />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
