import axios from 'axios';
import {
	// REGISTER_SUCCESS,
	// REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	SET_AUTH_LOADING,
	CLEAR_AUTH_ERRORS,
	LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({ type: USER_LOADED, payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: AUTH_ERROR });
	}
};

// export const register = (formData) => async (dispatch) => {
// 	dispatch({ type: SET_AUTH_LOADING });

// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	};

// 	try {
// 		const res = await axios.post('/api/users', formData, config);

// 		dispatch({ type: REGISTER_SUCCESS, payload: res.data });
// 	} catch (err) {
// 		dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
// 	}

// 	dispatch(loadUser());
// };

export const login = (formData) => async (dispatch) => {
	dispatch({ type: SET_AUTH_LOADING });

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/auth', formData, config);

		dispatch({ type: LOGIN_SUCCESS, payload: res.data });
	} catch (err) {
		dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
	}

	dispatch(loadUser());
};

export const clearAuthError = () => (dispatch) => {
	dispatch({ type: CLEAR_AUTH_ERRORS });
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
