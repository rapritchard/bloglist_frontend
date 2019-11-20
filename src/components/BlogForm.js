import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ handleSubmit, newBlog, setNewBlog }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={({ target }) => setNewBlog({...newBlog, title: target.value })}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={({ target }) => setNewBlog({...newBlog, author: target.value })}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={({ target }) => setNewBlog({...newBlog, url: target.value })}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
