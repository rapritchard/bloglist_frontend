export default (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    case 'CLEAR_USERS':
      return [];
    default:
      return state;
  }
};
