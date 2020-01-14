import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks';
import { addBlog } from '../actions/blogsActions';
import { setNotification } from '../actions/notifcationActions';

const BlogForm = ({ addBlog, setNotification }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: title.attributes.value,
        author: author.attributes.value,
        url: url.attributes.value,
      };
      await addBlog(newBlog);
      title.reset();
      author.reset();
      url.reset();
      setNotification(
        'success',
        `Added a new blog titled: '${newBlog.title}' to the list.`,
        3000,
      );
    } catch (exception) {
      setNotification(
        'error',
        exception.response.data.error,
        3000,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input {...title.attributes}/>
      </div>
      <div>
        Author:
        <input {...author.attributes}/>
      </div>
      <div>
        URL:
        <input {...url.attributes}/>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

const connectBlogForm = connect(
  null,
  {
    addBlog,
    setNotification,
  }
)(BlogForm);

export default connectBlogForm;
