import axios from 'axios';
import {
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGIN_FAIL,
	ADMIN_USER_LOADED,
	ADMIN_AUTH_ERROR,
	SET_ADMIN_AUTH_LOADING,
	CLEAR_ADMIN_ERRORS,
	ADMIN_LOGOUT,
	CREATE_STUDENT,
	STUDENT_ERROR,
} from './types';
import setAdminToken from '../utils/setAdminToken';

export const adminLoadUser = () => async (dispatch) => {
	if (localStorage.admin) {
		setAdminToken(localStorage.admin);
	}

	try {
		const res = await axios.get('/api/admin/auth');
		dispatch({ type: ADMIN_USER_LOADED, payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: ADMIN_AUTH_ERROR });
	}
};

export const adminLogin = (formData) => async (dispatch) => {
	dispatch({ type: SET_ADMIN_AUTH_LOADING });

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/admin/auth', formData, config);

		dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: res.data });
	} catch (err) {
		dispatch({ type: ADMIN_LOGIN_FAIL, payload: err.response.data.msg });
	}

	dispatch(adminLoadUser());
};

export const createUser = (formData) => async (dispatch) => {
	// Create User Loading to be here

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/users', formData, config);

		console.log(res.data);
		// dispatch({ type: CREATE_STUDENT, payload: res.data });
	} catch (err) {
		dispatch({ type: STUDENT_ERROR, payload: err.response.data.msg });
	}
};

export const clearAdminError = () => (dispatch) => {
	dispatch({ type: CLEAR_ADMIN_ERRORS });
};

export const logout = () => (dispatch) => {
	dispatch({ type: ADMIN_LOGOUT });
};
