import React, { useState } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useStyles from './MaterialStyles';

import TaskForm from './TaskForm';
import ShareForm from './ShareForm';
import { updateTask, deleteTask } from '../../actions/tasks';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const Task = ({ task, updateTask, deleteTask }) => {
  const [isFocused, setFocus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [share, setShare] = useState(false);
  const classes = useStyles();
  const { _id, name, description, date, done } = task;
  const statusButton = done ? 'Open' : 'Close';

  const handleShow = () => {
    setFocus(!isFocused);
  };

  const handleEditedTask = (edited) => {
    setEdit(false);
    updateTask(edited);
  };

  const handleSharedEmail = (email) => {
    console.log(email);
    setShare(false);
    // shareTask(_id, email);
  };

  const changeTaskStatus = () => {
    updateTask({ ...task, done: !done });
  };

  const onDelete = () => {
    setEdit(false);
    deleteTask(_id, name);
  };

  const onShare = () => setShare(true);
  const onEdit = () => setEdit(true);
  const closeForm = () => {
    setEdit(false);
    setShare(false);
  };

  return (
    <>
      <div className={isFocused ? 'focusTask' : 'header'} onClick={handleShow}>
        <h6 className='taskName'>{name}</h6>
        {done && <span className='badge-closed'>closed</span>}
        <div className='date'>
          <Moment date={date} format='YYYY-MM-DD hh:mm:ss' />
        </div>
      </div>
      {isFocused && (
        <div className='description'>
          <div className='descHeader'>Description</div>
          <div>{description}</div>
          <div className='task-buttons'>
            {!done && (
              <Button
                variant='outlined'
                color='default'
                className={classes.button}
                onClick={onEdit}
              >
                EDIT
              </Button>
            )}
            <Button
              variant='outlined'
              color='secondary'
              className={classes.button}
              onClick={onDelete}
            >
              DELETE
            </Button>
            <Button
              variant='outlined'
              color='default'
              className={classes.button}
              onClick={onShare}
            >
              Share with
            </Button>
            <ThemeProvider theme={theme}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.button}
                onClick={changeTaskStatus}
              >
                {statusButton}
              </Button>
            </ThemeProvider>
          </div>
          {edit && (
            <TaskForm
              id={_id}
              name={name}
              edit={edit}
              description={description}
              handleInput={handleEditedTask}
              closeForm={closeForm}
            />
          )}
          {share && (
            <ShareForm
              share={share}
              handleInput={handleSharedEmail}
              closeForm={closeForm}
            />
          )}
        </div>
      )}
    </>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default connect(null, { updateTask, deleteTask })(Task);
