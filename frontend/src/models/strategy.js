import { getStrategyList } from '@/services/strategy';

export default {
  namespace: 'strategy',

  state: {
    strategyList: [],
  },

  effects: {
    *getStrategyList(_, { call, put }) {
      const response = yield call(getStrategyList);
      yield put({
        type: 'update',
        payload: {
          strategyList: response,
        },
      });
    },
  },

  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
