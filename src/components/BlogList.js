import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const displayBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes);
    return blogs.map((blog) => <Blog key={blog.id} blogId={blog.id} />);
  };

  return (
    <div>
      {displayBlogs()}
    </div>
  );
};

export default BlogList;
