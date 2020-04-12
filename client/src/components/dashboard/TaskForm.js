import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import useStyles from './MaterialStyles';

const TaskForm = ({ id, name, description, edit, closeForm, handleInput }) => {
  const classes = useStyles();
  const initErrorMessages = { name: false, description: false };
  const confirmButton = id ? 'Edit Task' : 'Add Task';

  const [input, setInput] = React.useState({
    name,
    description,
  });

  const [error, setError] = React.useState(initErrorMessages);

  const handleEdit = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value });
    setError({ ...error, [name]: false });
  };

  const cancelEdit = () => {
    closeForm();
    setError(initErrorMessages);
  };

  const handleErrors = () => {
    input.name === ''
      ? setError({ ...error, name: true })
      : setError({ ...error, description: true });
  };

  const finishUpdate = () => {
    const { name, description } = input;

    if (name === '' || description === '') {
      handleErrors();
    } else {
      id ? handleInput({ ...input, _id: id }) : handleInput(input);

      cancelEdit();
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={edit}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle>Fill the form</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <TextField
            id='standard-basic'
            className={classes.textFieldTaskName}
            label='task name'
            name='name'
            autoComplete='off'
            onChange={handleEdit}
            defaultValue={name}
            error={error.name}
            helperText={error.name ? 'Empty field!' : ' '}
          />
          <TextField
            id='standard-basic'
            className={classes.textFieldDescription}
            label='description'
            name='description'
            multiline={true}
            onChange={handleEdit}
            defaultValue={description}
            error={error.description}
            helperText={error.description ? 'Empty field!' : ' '}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={cancelEdit}
          variant='outlined'
          color='secondary'
          className={classes.button}
        >
          Close
        </Button>
        <Button
          onClick={finishUpdate}
          variant='outlined'
          color='primary'
          className={classes.button}
        >
          {confirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TaskForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default TaskForm;
