import axios from "axios";
import { REGISTER_SUCCESS, CLEAR_PROFILE, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS,LOGOUT} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../ustils/setAuthToken";
//load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        // FIX 1: Corrected typo 'dara' to 'data'
        const errors = err.response.data.errors;

        if (errors) {
            // FIX 2: Removed '.array'. 'errors' is usually already an array.
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}

//login user
export const login = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify({  email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        // FIX 1: Corrected typo 'dara' to 'data'
        const errors = err.response.data.errors;

        if (errors) {
            // FIX 2: Removed '.array'. 'errors' is usually already an array.
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

//logout /clear
export const logout = () => dispatch =>{
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
}