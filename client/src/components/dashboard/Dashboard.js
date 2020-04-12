import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserTasks } from '../../actions/tasks';
import Spinner from '../layout/Spinner';
import Task from './Task';
import AddNewTask from './AddNewTask';
import DeleteForm from './DeleteForm';

const Dashboard = ({ getUserTasks, auth: { user }, tasks: { userTasks } }) => {
  useEffect(() => {
    getUserTasks();
  }, [getUserTasks]);

  const [showSpinner, setShowSpinner] = useState(true);
  setTimeout(() => setShowSpinner(false), 800);

  const welcomeBlock = (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {!userTasks && (
        <p>You have not yet added any tasks, please add the first one</p>
      )}
      <AddNewTask />
    </>
  );

  return (
    <>
      {userTasks === null ? (
        showSpinner ? (
          <Spinner />
        ) : (
          <>
            {welcomeBlock}
            <DeleteForm />
          </>
        )
      ) : (
        <>
          {welcomeBlock}
          {userTasks.map((task) => (
            <Task key={task.date} task={task} />
          ))}
          <DeleteForm />
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
