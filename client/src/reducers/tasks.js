import { GET_TASKS, TASKS_ERROR } from '../actions/constants';

const initialState = {
  userTasks: [],
  loading: true,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        userTasks: payload,
        loading: false,
      };
    case TASKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
