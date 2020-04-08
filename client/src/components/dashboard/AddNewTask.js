import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import InputForm from './InputForm';
import { addTask } from '../../actions/tasks';
import useStyles from './MaterialStyles';

const AddNewTask = ({ addTask }) => {
  const classes = useStyles();
  const initInput = { name: '', description: '' };

  const [edit, setEdit] = React.useState(false);

  const handleOpen = () => {
    setEdit(true);
  };

  const handleClose = () => {
    setEdit(false);
  };

  const handleNewTask = (newTask) => {
    addTask(newTask);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className={classes.newTaskButton}
        variant='outlined'
        color='secondary'
      >
        ADD NEW TASK
      </Button>
      {edit && (
        <InputForm
          id={initInput.id}
          name={initInput.name}
          edit={edit}
          description={initInput.description}
          handleInput={handleNewTask}
          cancelConfirmation={handleClose}
        />
      )}
    </div>
  );
};

AddNewTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default connect(null, { addTask })(AddNewTask);
