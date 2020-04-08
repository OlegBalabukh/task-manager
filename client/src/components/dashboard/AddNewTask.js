import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TaskForm from './TaskForm';
import { addTask } from '../../actions/tasks';
import useStyles from './MaterialStyles';

const AddNewTask = ({ addTask }) => {
  const classes = useStyles();
  const initInput = { name: '', description: '' };

  const [edit, setEdit] = React.useState(false);

  const openForm = () => {
    setEdit(true);
  };

  const closeForm = () => {
    setEdit(false);
  };

  const handleNewTask = (newTask) => {
    addTask(newTask);
    closeForm();
  };

  return (
    <div>
      <Button
        onClick={openForm}
        className={classes.newTaskButton}
        variant='outlined'
        color='secondary'
      >
        ADD NEW TASK
      </Button>
      {edit && (
        <TaskForm
          id={initInput.id}
          name={initInput.name}
          edit={edit}
          description={initInput.description}
          handleInput={handleNewTask}
          closeForm={closeForm}
        />
      )}
    </div>
  );
};

AddNewTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default connect(null, { addTask })(AddNewTask);
