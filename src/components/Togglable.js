/* eslint-disable react/display-name */
import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className="togglableContent" style={showWhenVisible}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
