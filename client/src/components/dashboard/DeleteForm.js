import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import useStyles from './MaterialStyles';

import { deleteUser } from '../../actions/auth';

const DeleteForm = ({ deleteUser }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleForm = () => {
    setOpen(!open);
  };

  return (
    <div className='text-right'>
      <Button
        variant='outlined'
        color='secondary'
        className={classes.dashboardButton}
        onClick={toggleForm}
      >
        DELETE USER
      </Button>
      {open && (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          fullWidth={true}
          maxWidth={'xs'}
        >
          <DialogTitle>Confirm delete</DialogTitle>
          <DialogContent align='center'>
            <Typography>Your account and tasks will be removed.</Typography>
            <Typography variant='h6' color='error'>
              Are you sure you want to proceed?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={toggleForm}
              variant='outlined'
              color='primary'
              className={classes.button}
            >
              CLOSE
            </Button>
            <Button
              onClick={deleteUser}
              variant='contained'
              color='secondary'
              className={classes.button}
            >
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

DeleteForm.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

export default connect(null, { deleteUser })(DeleteForm);
