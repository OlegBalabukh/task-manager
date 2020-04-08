import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserTasks } from '../../actions/tasks';
import Spinner from '../layout/Spinner';
import Task from './Task';
import AddNewTask from './AddNewTask';

const Dashboard = ({
  getUserTasks,
  auth: { user },
  tasks: { userTasks, loading },
}) => {
  useEffect(() => {
    getUserTasks();
  }, []);

  return loading && userTasks.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {userTasks.length ? (
        <>
          <span className='text-center'>
            <AddNewTask />
          </span>
          {userTasks.length > 0 &&
            userTasks.map((task) => <Task key={task.date} task={task} />)}
        </>
      ) : (
        <>
          <p>You have not yet added any tasks, please add the first one</p>
          <Link to='/create-task' className='btn btn-primary my-1'>
            Create Task
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getUserTasks: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tasks: state.tasks,
});

export default connect(mapStateToProps, { getUserTasks })(Dashboard);
