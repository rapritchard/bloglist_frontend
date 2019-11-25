import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from '../components/SimpleBlog';

test('Should render blog content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Some Test Author',
    url: 'www.someurl.com',
    likes: 11,
  };

  const mockHandler = jest.fn();

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />,
  );

  // component.debug();
  // const button = component.container.querySelector('button');
  // console.log(prettyDOM(button));
  // Method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library',
  );
  // Method 2
  // const element = component.getByText(
  //   'Component testing is done with react-testing-library',
  // );
  // expect(element).toBeDefined();
  // Method 3
  const div = component.container.querySelector('.blog');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library',
  );
});
