import axios from 'axios';

import { GET_TASKS, TASKS_ERROR } from './constants';

// Get current user's tasks
export const getUserTasks = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/tasks');
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
