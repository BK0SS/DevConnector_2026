import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  
  // Links to show when logged in
  const authLinks = (
    <ul>
      <li><Link to="/dashboard">
      <i className="fas fa-user"></i>{' '}
      <span className="hide-sm">Dashboard</span></Link>
      </li>

      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  // Links to show when logged out
  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

// Fix: propTypes should be camelCase
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);