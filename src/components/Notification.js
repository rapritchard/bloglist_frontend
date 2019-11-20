import React from 'react';

const Notification = ({ message }) => {
  if (message.messageText === null) {
    return null;
  }

  return (
    <div className={message.error ? 'message error' : 'message success'}>
      {message.messageText}
    </div>
  );
};

export default Notification;
