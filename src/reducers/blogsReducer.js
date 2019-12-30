export default (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'CLEAR_BLOGS':
      return [];
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'LIKE_BLOG': {
      const { id } = action.data;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    }
    case 'DELETE_BLOG': {
      return state.filter((b) => b.id !== action.data);
    }
    default:
      return state;
  }
};
