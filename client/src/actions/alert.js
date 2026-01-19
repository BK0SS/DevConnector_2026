import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Optional: Add a 'timeout' parameter (default 5000ms)
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid();
    
    // 1. Dispatch the Set Alert
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    // 2. Dispatch the Remove Alert after 5 seconds
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};