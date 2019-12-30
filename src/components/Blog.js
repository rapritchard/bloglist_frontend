import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../actions/notifcationActions';
import {
  likeBlog, removeBlog,
} from '../actions/blogsActions';

// { blog, username, handleLikeBlog, handleDeleteBlog
const Blog = ({ blogId }) => {
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId));
  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

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

  const handleDeleteBlog = async (blogToDelete) => {
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
        {user.username === blog.user.username && <button type="button" onClick={() => handleDeleteBlog(blog)}>Remove</button>}
      </div>
    </div>
  );
};

export default Blog;
