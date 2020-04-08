import {
  GET_TASKS,
  TASKS_ERROR,
  CLEAR_TASKS,
  ADD_TASK,
} from '../actions/constants';

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
    case ADD_TASK:
      return {
        ...state,
        userTasks: [payload, ...state.userTasks],
      };
    default:
      return state;
  }
};
