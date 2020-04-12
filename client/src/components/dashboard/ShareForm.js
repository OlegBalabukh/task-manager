import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import useStyles from './MaterialStyles';

const ShareForm = ({ closeForm, handleInput, share }) => {
  const classes = useStyles();

  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(false);

  const onChange = ({ target: { value } }) => {
    setEmail(value);
    setError(false);
  };

  const cancelSharing = () => {
    closeForm();
    setError(false);
  };

  const isEmailAddress = () => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(email);
  };

  const submitInput = () => {
    isEmailAddress() ? handleInput(email) : setError(true);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={share}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle>Enter user email</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <TextField
            id='standard-basic'
            className={classes.textFieldTaskName}
            label='email'
            autoComplete='off'
            onChange={onChange}
            error={error}
            helperText={error ? 'Enter a valid email address' : ' '}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={cancelSharing}
          variant='outlined'
          color='secondary'
          className={classes.button}
        >
          Close
        </Button>
        <Button
          onClick={submitInput}
          variant='outlined'
          color='primary'
          className={classes.button}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShareForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  share: PropTypes.bool.isRequired,
};

export default ShareForm;
