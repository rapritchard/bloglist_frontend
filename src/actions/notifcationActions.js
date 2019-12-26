const setNotification = (type, message, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        type,
        message,
      },
    });

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, seconds);
  };
};

export default setNotification;
