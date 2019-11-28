import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

jest.mock('./services/blogs');

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />,
    );
    component.rerender(<App />);

    await waitForElement(() => component.getByText('Login'));

    expect(component.container).toHaveTextContent('Username:');
    expect(component.container).toHaveTextContent('Password:');

    expect(component.container.querySelector('.blog')).toBe(null);
  });

  test('should render all blogs it gets from backend', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
    };

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user));

    const component = render(
      <App />,
    );
    component.rerender(<App />);
    await waitForElement(
      () => component.container.querySelector('.blogTitle'),
    );

    const blogs = component.container.querySelectorAll('.blogTitle');
    expect(blogs.length).toBe(4);

    expect(component.container).toHaveTextContent(
      'React patterns',
    );
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful',
    );
    expect(component.container).toHaveTextContent(
      'Canonical string reduction',
    );
    expect(component.container).toHaveTextContent(
      'Inside Apple’s iPhone Software Shakeup After Buggy iOS 13 Debut',
    );
  });
});
