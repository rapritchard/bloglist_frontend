import blogService from '../services/blogs';

const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};

const clearBlogs = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_BLOGS' });
};

const addBlog = (newBlog) => async (dispatch, getState) => {
  const state = getState();
  blogService.setToken(state.user.token);
  const returnedBlog = await blogService.create(newBlog);
  const returnedBlogWithUser = {
    ...returnedBlog,
    user: {
      id: returnedBlog.user,
      name: state.user.name,
      username: state.user.username,
    },
  };
  dispatch({
    type: 'NEW_BLOG',
    data: returnedBlogWithUser,
  });
}

const likeBlog = (id, newObject) => async (dispatch, getState) => {
  const state = getState();
  blogService.setToken(state.user.token);
  const returnedBlog = await blogService.update(id, newObject);
  dispatch({
    type: 'LIKE_BLOG',
    data: returnedBlog,
  });
};

const removeBlog = (id) => async (dispatch, getState) => {
  const state = getState();
  blogService.setToken(state.user.token);
  await blogService.deleteRecord(id);
  dispatch({
    type: 'DELETE_BLOG',
    data: id,
  });
};

export {
  initializeBlogs,
  clearBlogs,
  likeBlog,
  addBlog,
  removeBlog,
};
