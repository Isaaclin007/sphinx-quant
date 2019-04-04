import { getStrategyList, getStrategyCode } from '@/services/strategy';

export default {
  namespace: 'strategy',

  state: {
    strategyList: [],
    currentStrategyDetail: {},
    currentCodeText: '',
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
    *getStrategyCode({ payload }, { call, put }) {
      const response = yield call(getStrategyCode, payload);
      yield put({
        type: 'update',
        payload: {
          currentCodeText: response.code_text,
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
