import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
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

const MemoNotification = React.memo(Notification);
export default MemoNotification;
