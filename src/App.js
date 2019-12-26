import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setNotification } from './actions/notifcation';
import loginService from './services/login';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useField } from './hooks';

const App = (props) => {
  const [blogs, setBlogs] = useState([]);
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);
  // const [message, setMessage] = useState({
  //   text: null,
  //   type: null,
  // });


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON);
      setUser(savedUser);
      // Caused errors in testing
      // blogService.setToken(savedUser.token);
    }
    (async function grabBlogs() {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    }());
  }, []);

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
      setUser(userToLogin);
      username.reset();
      password.reset();

      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    } catch (exception) {
      props.setNotification(
        'error',
        exception.response.data.error,
        3000,
      );
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    setBlogs([]);
    window.localStorage.removeItem('loggedBloglistUser');
  };


  const blogFormRef = React.createRef();

  const handleAddBlog = async (newObject) => {
    try {
      blogService.setToken(user.token);
      const returnedBlog = await blogService.create(newObject);
      blogFormRef.current.toggleVisibility();
      const returnedBlogWithUser = {
        ...returnedBlog,
        user: {
          id: returnedBlog.user,
          name: user.name,
          username: user.username,
        },
      };
      setBlogs(blogs.concat(returnedBlogWithUser));
      props.setNotification(
        'success',
        `Added a new blog titled: '${returnedBlog.title}' to the list.`,
        3000,
      );
    } catch (exception) {
      props.setNotification(
        'error',
        exception.response.data.error,
        3000,
      );
    }
  };

  const handleLikeBlog = async (oldBlog) => {
    const { id } = oldBlog;
    const updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 };

    try {
      blogService.setToken(user.token);
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(
        blogs.map(
          (b) => {
            if (b.id === id) {
              b.likes += 1;
              return b;
            }
            return b;
          },
        ),
      );
    } catch (exception) {
      props.setNotification(
        'error',
        'Failed to like this blog.',
        3000,
      );
    }
  };

  const handleDeleteBlog = async (id) => {
    const blogToDelete = blogs.find(b => b.id === id);
    if (window.confirm(`Remove blog '${blogToDelete.title}' by ${blogToDelete.author}`)) {
      try {
        blogService.setToken(user.token);
        await blogService.deleteRecord(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (exception) {
        setBlogs(blogs.filter((b) => b.id !== id));
        props.setNotification(
          'error',
          'This blog has already been removed.',
          3000,
        );
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

export default connect(
  null,
  { setNotification },
)(App);
