import usersService from '../services/users';

const initializeUsers = () => async (dispatch) => {
  const users = await usersService.getAll();
  dispatch({
    type: 'INIT_USERS',
    data: users,
  });
};

const clearUsers = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_USERS' });
};

export {
  initializeUsers,
  clearUsers,
};
