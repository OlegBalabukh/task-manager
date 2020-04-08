import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    fontWeight: 600,
    marginLeft: theme.spacing(2),
  },
  newTaskButton: {
    margin: theme.spacing(2),
    fontWeight: 600,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  textFieldTaskName: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textFieldDescription: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
