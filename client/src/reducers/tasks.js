import { GET_TASKS, TASKS_ERROR, CLEAR_TASKS } from '../actions/constants';

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

    case CLEAR_TASKS:
      return {
        ...state,
        userTasks: [],
        loading: false,
      };
    default:
      return state;
  }
};
