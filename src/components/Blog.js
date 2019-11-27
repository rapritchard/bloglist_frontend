import React, { useState } from 'react';

const Blog = ({ blog, username, handleLikeBlog, handleDeleteBlog}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };


  return (
    <div className="blog" style={blogStyle}>
      <div className="blogTitle" onClick={toggleVisibility}>
        {blog.title}
        {' '}
        {blog.author}
      </div>
      <div className="blogInfo" style={showWhenVisible}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
        <p>
          {blog.likes}
          {' '}
          likes
          {' '}
          <button type="button" onClick={() => handleLikeBlog(blog)}>Like</button>
        </p>
        <p>Added by {blog.user.name}</p>
        {username === blog.user.username && <button type="button" onClick={() => handleDeleteBlog(blog.id)}>Remove</button>}
      </div>
    </div>
  );
};

export default Blog;
