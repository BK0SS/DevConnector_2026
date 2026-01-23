import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom' 

const PrivateRoute = ({ 
  auth: { isAuthenticated, loading }, 
  children // Change: accept 'children' instead of 'component' and '...rest'
}) => {
  
  
  if (loading) {
    return <div>Loading...</div>; 
  }


  return isAuthenticated ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.node 
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)