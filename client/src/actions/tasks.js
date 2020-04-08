import axios from 'axios';

import { GET_TASKS, TASKS_ERROR, ADD_TASK } from './constants';

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

export const addTask = ({ name, description }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, description });

  try {
    const res = await axios.post('/api/tasks', body, config);

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
