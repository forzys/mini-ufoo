export default {
  namespace: 'about',
  state: [
    { a:1 }
  ],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
