import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => (
  <header>
    <nav>
      <NavLink to="/">Blogs</NavLink>
      <NavLink to="/users">Users</NavLink>
      <form>
        {props.username}
        {' '}
          logged in
        {' '}
        <button type="submit" onClick={props.handleLogout}>Logout</button>
      </form>
    </nav>
  </header>
);

export default NavBar;
