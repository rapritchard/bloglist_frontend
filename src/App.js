import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from './actions/notifcationActions';
import loginService from './services/login';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useField } from './hooks';
import {
  initializeBlogs, likeBlog, addBlog, removeBlog, clearBlogs,
} from './actions/blogsActions';
import {
  setUser, clearUser,
} from './actions/userActions';

const App = () => {
  const username = useField('text');
  const password = useField('password');
  const blogs = useSelector((state) => state.blogs);
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

  const handleLikeBlog = async (oldBlog) => {
    const { id } = oldBlog;
    const updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
    try {
      await dispatch(likeBlog(id, updatedBlog));
    } catch (exception) {
      dispatch(setNotification(
        'error',
        'Failed to like this blog.',
        3000,
      ));
    }
  };

  const handleDeleteBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    if (window.confirm(`Remove blog '${blogToDelete.title}' by ${blogToDelete.author}`)) {
      try {
        await dispatch(removeBlog(blogToDelete.id));
      } catch (exception) {
        dispatch(setNotification(
          'error',
          'This blog has already been removed.',
          3000,
        ));
      }
    }
  };

  const displayBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes);
    return blogs.map((blog) => <Blog key={blog.id} blog={blog} username={user.username} handleLikeBlog={handleLikeBlog} handleDeleteBlog={handleDeleteBlog} />);
  };

  if (user === null) {
    return (
      <div>
        <h2>Login to the blog list</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
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
      <div>
        {displayBlogs()}
      </div>
    </div>
  );
};

export default App;
