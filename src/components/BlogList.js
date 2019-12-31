import React from 'react';
import { connect, useSelector } from 'react-redux';
import Blog from './Blog';


const BlogListConnect = (props) => (
  <div>
    {props.blogsToShow.map((blog) => <Blog key={blog.id} blogId={blog.id} />)}
  </div>
);

const blogsToShow = ({ blogs }) => {
  const sortedBlogs = blogs;
  return sortedBlogs.sort((a, b) => b.likes - a.likes);
}

const mapStateToProps = (state) => ({
  blogsToShow: blogsToShow(state),
});

const ConnnectedBlogList = connect(mapStateToProps)(BlogListConnect);


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

// export default BlogList;

export default ConnnectedBlogList;
