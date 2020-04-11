import axios from 'axios';

import {
  GET_TASKS,
  TASKS_ERROR,
  TASK_ADDED,
  TASK_UPDATED,
  TASK_DELETED,
} from './constants';
import { setAlert } from './alert';

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
      type: TASK_ADDED,
      payload: res.data,
    });
    dispatch(
      setAlert(
        `${name.toUpperCase()} added to your task list!`,
        'success',
        3000
      )
    );
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateTask = ({ _id, name, description, done }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, description, done });

  try {
    const res = await axios.post(`/api/tasks/${_id}`, body, config);

    dispatch({
      type: TASK_UPDATED,
      payload: res.data,
    });
    dispatch(
      setAlert(`${res.data.name.toUpperCase()} updated!`, 'success', 3000)
    );
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const shareTask = (_id, email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(`/api/tasks/share/${_id}`, body, config);

    res.data.type === 'error'
      ? dispatch(setAlert(res.data.msg, 'task-danger'))
      : dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteTask = (id, name) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/tasks/${id}`);
    dispatch({
      type: TASK_DELETED,
      payload: res.data,
    });
    dispatch(setAlert(`${name.toUpperCase()} deleted!`, 'success', 3000));
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
