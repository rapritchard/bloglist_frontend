import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    text: null,
    type: null,
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON);
      setUser(savedUser);
      blogService.setToken(savedUser.token);

      (async function grabBlogs() {
        const initialBlogs = await blogService.getAll();
        setBlogs(initialBlogs);
      }());
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userToLogin = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(userToLogin),
      );

      blogService.setToken(userToLogin.token);
      setUser(userToLogin);
      setUsername('');
      setPassword('');

      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    } catch (exception) {
      setMessage({ text: exception.response.data.error, type: 'error' });
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 3000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    setBlogs([]);
    window.localStorage.removeItem('loggedBloglistUser');
  };

  const displayBlogs = () => blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });

      setMessage({ text: `Added ${returnedBlog.title} to the list.`, type: 'success' });
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 3000);
    } catch (exception) {
      setMessage({ text: exception.response.data.error, type: 'error' });
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 3000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Login to the blog list</h2>
        <Notification message={message} />
        <LoginForm
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
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
      <Notification message={message} />
      <Togglable buttonLabel="Add Blog">
        <BlogForm
          handleSubmit={handleAddBlog}
          newBlog={newBlog}
          setNewBlog={setNewBlog}
        />
      </Togglable>
      <div>
        {displayBlogs()}
      </div>
    </div>
  );
};

export default App;
