import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog /> Component', () => {
  let blog;
  let user;
  let component;
  let mockHandler;

  beforeEach(() => {
    blog = {
      id: '1314545aagg',
      title: 'Component testing is done with react-testing-library',
      author: 'Some Test Author',
      url: 'www.someurl.com',
      likes: 11,
      user: {
        username: 'someuser',
        name: 'somename',
        id: '125455nbnaba',
      },
    };

    user = {
      username: 'someuser',
      name: 'somename',
      id: '125455nbnaba',
    };

    mockHandler = jest.fn();

    component = render(
      <Blog blog={blog} user={user} handleLikeBlog={mockHandler} handleDeleteBlog={mockHandler} />,
    );
  });

  test('should only show the name and author of the blog post by default', () => {
    const div = component.container.querySelector('.blog');
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library',
      'Some Test Author',
    );
  });

  test('should not display children at start', () => {
    const div = component.container.querySelector('.blogInfo');
    expect(div).toHaveStyle('display: none');
  });

  test('should display children when div clicked', () => {
    const clickDiv = component.container.querySelector('.blogTitle');
    fireEvent.click(clickDiv);

    const div = component.container.querySelector('.blogInfo');
    expect(div).not.toHaveStyle('display: none');
  });

});
