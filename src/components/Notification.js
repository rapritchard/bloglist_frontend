import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const { type, message } = notification;

  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(
  mapStateToProps,
  null,
)(Notification);
