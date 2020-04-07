import React, { useState } from 'react';
import Moment from 'react-moment';

import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useStyles from './MaterialStyles';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const Task = ({ task: { name, description, date } }) => {
  const [isFocused, setFocus] = useState(false);
  const classes = useStyles();

  const handleShow = () => {
    setFocus(!isFocused);
  };

  return (
    <>
      <div className={isFocused ? 'focusTask' : 'header'} onClick={handleShow}>
        <h6 className='taskName'>{name}</h6>
        <div className='date'>
          <Moment date={date} format='YYYY-MM-DD hh:mm:ss' />
        </div>
      </div>
      {isFocused && (
        <div className='description'>
          <div className='descHeader'>Description</div>
          <div>{description}</div>
          <div className='task-buttons'>
            <Button
              variant='outlined'
              color='default'
              className={classes.button}
            >
              EDIT
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              className={classes.button}
            >
              DELETE
            </Button>
            <ThemeProvider theme={theme}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.button}
              >
                COMPLETE
              </Button>
            </ThemeProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
