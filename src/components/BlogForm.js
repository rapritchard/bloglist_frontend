import React, { useState } from 'react';

const BlogForm = ({ handleAddBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      };
      await handleAddBlog(newBlog);
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
    } catch (exception) {
      // Ignore
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
