import React, { useState } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import useStyles from './MaterialStyles';

import TaskForm from './TaskForm';
import ShareForm from './ShareForm';
import { updateTask, deleteTask, shareTask } from '../../actions/tasks';

const Task = ({ task, updateTask, deleteTask, shareTask }) => {
  const [isFocused, setFocus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [share, setShare] = useState(false);
  const classes = useStyles();
  const { _id, name, description, date, done, sharedBy } = task;
  const statusButton = done ? 'Open' : 'Close';

  const handleShow = () => {
    setFocus(!isFocused);
  };

  const handleEditedTask = (edited) => {
    setEdit(false);
    updateTask({ ...edited, sharedBy });
  };

  const handleSharedEmail = (email) => {
    setShare(false);
    shareTask(_id, email);
  };

  const changeTaskStatus = () => {
    updateTask({ ...task, done: !done, sharedBy });
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
          {sharedBy && <span className='shared-by'>shared by {sharedBy}</span>}
          <Moment date={date} format='YYYY-MM-DD hh:mm:ss' />
        </div>
      </div>
      {isFocused && (
        <div className='description'>
          <div className='descHeader'>Description</div>
          <div>{description}</div>
          <div className='task-buttons m'>
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
            {!sharedBy && (
              <Button
                variant='outlined'
                color='default'
                className={classes.button}
                onClick={onShare}
              >
                SHARE WITH
              </Button>
            )}
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
              onClick={changeTaskStatus}
            >
              {statusButton}
            </Button>
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
  shareTask: PropTypes.func.isRequired,
};

export default connect(null, { updateTask, deleteTask, shareTask })(Task);
