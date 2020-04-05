import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserTasks } from '../../actions/tasks';

const Dashboard = ({ getUserTasks, auth, tasks }) => {
  useEffect(() => {
    getUserTasks();
  }, []);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getUserTasks: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tasks: state.tasks.userTasks,
});

export default connect(mapStateToProps, { getUserTasks })(Dashboard);
