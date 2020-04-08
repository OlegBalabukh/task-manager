import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import useStyles from './MaterialStyles';

const InputForm = (props) => {
  const classes = useStyles();
  const { id, name, description, edit } = props;
  const initErrorMessages = { name: false, description: false };
  const confirmButton = id ? 'Edit Task' : 'Add Task';

  const [input, setInput] = React.useState({
    name: name,
    description: description,
    id: id,
  });
  const [error, setError] = React.useState(initErrorMessages);

  const handleTaskName = ({ target: { value } }) => {
    setInput({ ...input, name: value, id: Date.now() });
    setError({ ...error, name: false });
  };

  const handleDescription = ({ target: { value } }) => {
    setInput({ ...input, description: value });
    setError({ ...error, description: false });
  };

  const cancelEdit = () => {
    props.cancelConfirmation();
    setError(initErrorMessages);
  };

  const handleErrors = () => {
    input.name === ''
      ? setError({ ...error, name: true })
      : setError({ ...error, description: true });
  };

  const getInput = () => {
    const { name, description } = input;

    if (name === '' || description === '') {
      handleErrors();
    } else {
      props.handleInput(input);
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
            margin='normal'
            // fullWidth={false}
            autoComplete='off'
            onChange={handleTaskName}
            defaultValue={name}
            error={error.name}
            helperText={error.name ? 'Empty field!' : ' '}
          />
          <TextField
            id='standard-basic'
            className={classes.textFieldDescription}
            label='description'
            margin='normal'
            multiline={true}
            // fullWidth={true}
            // maxWidth={'lg'}
            onChange={handleDescription}
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
          onClick={getInput}
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

export default InputForm;
