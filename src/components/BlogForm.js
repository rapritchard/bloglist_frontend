import React from 'react';
import { useField } from '../hooks';

const BlogForm = ({ handleAddBlog }) => {
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
      await handleAddBlog(newBlog);
      title.reset();
      author.reset();
      url.reset();
    } catch (exception) {
      // Ignore
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

export default BlogForm;
