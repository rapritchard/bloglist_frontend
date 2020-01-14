import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Blog from './Blog';


const BlogListConnect = (props) => {
  const blogLinkStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {props.blogsToShow.map((blog) => (
        <div key={blog.id} style={blogLinkStyle}>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

const blogsToShow = ({ blogs }) => {
  const sortedBlogs = blogs;
  return sortedBlogs.sort((a, b) => b.likes - a.likes);
};

const mapStateToProps = (state) => ({
  blogsToShow: blogsToShow(state),
});

const ConnnectedBlogList = connect(mapStateToProps)(BlogListConnect);


// const BlogList = () => {
//   const blogs = useSelector((state) => state.blogs);

//   const displayBlogs = () => {
//     blogs.sort((a, b) => b.likes - a.likes);
//     return blogs.map((blog) => <Blog key={blog.id} id={blog.id} />);
//   };

//   return (
//     <div>
//       {displayBlogs()}
//     </div>
//   );
// };

// export default BlogList;

export default ConnnectedBlogList;
