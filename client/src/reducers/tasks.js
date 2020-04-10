import {
  GET_TASKS,
  TASKS_ERROR,
  CLEAR_TASKS,
  TASK_ADDED,
  TASK_UPDATED,
  TASK_DELETED,
} from '../actions/constants';

const initialState = {
  userTasks: null,
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
        userTasks: null,
        loading: false,
      };
    case TASK_ADDED:
      return {
        ...state,
        userTasks: state.userTasks ? [payload, ...state.userTasks] : [payload],
      };
    case TASK_UPDATED:
      return {
        ...state,
        userTasks: state.userTasks.map((task) => {
          return task._id === payload._id ? payload : task;
        }),
      };
    case TASK_DELETED:
      return {
        ...state,
        userTasks: payload,
      };
    default:
      return state;
  }
};
