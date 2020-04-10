
export default {
  namespace: 'music',
  state: [{ a: 2 }],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    }
  }
};