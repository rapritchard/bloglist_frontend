import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, setNotificationMessage }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));

        setNewTitle('');
        setNewAuthor('');
        setNewUrl('');
        setNotificationMessage({ messageText: `Added ${returnedBlog.title} to the list.`, error: false });
        setTimeout(() => {
          setNotificationMessage({ messageText: null });
        }, 3000);
      })
      .catch((error) => {
        setNotificationMessage({ messageText: error.response.data.error, error: true });
        setTimeout(() => {
          setNotificationMessage({ messageText: null });
        }, 3000);
      });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={newUrl}
          name="url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
