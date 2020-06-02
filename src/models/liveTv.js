
import TVList from '../utils/m3u8'


const stateData ={
  tvList: [...TVList],
}
export default {
  namespace: 'livetv',
  state: {...stateData},
  effects:{

  },
  reducers: {
    // 'delete'(state, { payload: id }) {
    //   return state.filter(item => item.id !== id);
    // },
    // *getList(){

    // }
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clear() {
      return { ...stateData };
    },
  },
};
