import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

const NotFoundPage = ({ auth: { isAuthenticated, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-danger'>Page not found!</h1>
      <p className='my-1 lead text-primary'>
        {isAuthenticated ? (
          <>Return to Dashboard</>
        ) : (
          <>Return to Login or Signup</>
        )}
      </p>
    </>
  );
};

NotFoundPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NotFoundPage);
