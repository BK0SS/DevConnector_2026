import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Fix 1: Changed 'alerts.lenght' to 'alerts.length'
const Alert = ({ alerts }) => 
    alerts !== null && 
    alerts.length > 0 && 
    alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

// Fix 2: Wrap the component in connect() so it actually receives the state
export default connect(mapStateToProps)(Alert);