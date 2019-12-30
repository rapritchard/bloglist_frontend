const clearNotification = () => {
  return async (dispatch) => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };
};

const setNotification = (type, message, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        type,
        message,
      },
    });

    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds);
  };
};

export {
  setNotification,
  clearNotification,
};
