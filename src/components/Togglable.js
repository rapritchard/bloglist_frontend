import React, { useState } from 'react';

const Togglable = (props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
