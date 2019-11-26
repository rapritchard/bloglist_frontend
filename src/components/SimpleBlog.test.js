import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from './SimpleBlog';


describe('<SimpleBlog /> Component', () => {
  let blog;
  let component;
  let mockHandler;

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Some Test Author',
      url: 'www.someurl.com',
      likes: 11,
    };

    mockHandler = jest.fn();

    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />,
    );
  });
  
  test('Should render blog content', () => {
    // component.debug();
    // const button = component.container.querySelector('button');
    // console.log(prettyDOM(button));
    // Method 1
    // expect(component.container).toHaveTextContent(
    //   'Component testing is done with react-testing-library',
    // );
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

  test('should call like event handler once on click', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
