const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

const clearUser = () => {
  return async (dispatch) => {
    dispatch({ type: 'CLEAR_USER' });
  };
};

export {
  setUser,
  clearUser,
};
