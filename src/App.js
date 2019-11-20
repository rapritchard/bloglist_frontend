import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Notification from './components/Notification';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState({
    messageText: null,
    error: false,
  });

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  const displayBlogs = () => blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  if (user === null) {
    return (
      <div>
        <h2>Login to the blog list</h2>
        <Notification message={notificationMessage} />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setNotificationMessage={setNotificationMessage}
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
      <Notification message={notificationMessage} />
      <BlogForm blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} />
      <div>
        {displayBlogs()}
      </div>
    </div>
  );
};

export default App;
