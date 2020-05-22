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
	GET_STUDENTS,
	ATTENDANCE_ERROR,
	ADD_ATTENDANCE,
	GET_ATTENDANCE,
	NOTES_ERROR,
	ADD_NOTES,
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

		dispatch({ type: CREATE_STUDENT, payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: STUDENT_ERROR, payload: err.response });
	}
};

export const getStudents = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/users');

		dispatch({ type: GET_STUDENTS, payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: STUDENT_ERROR, payload: err.response });
	}
};

export const getAttendance = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/admin/attendance');

		dispatch({ type: GET_ATTENDANCE, payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: ATTENDANCE_ERROR, payload: err.response });
	}
};

export const addAttendance = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/admin/attendance', formData, config);

		dispatch({ type: ADD_ATTENDANCE, payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: ATTENDANCE_ERROR, payload: err });
	}
};

// Add Notes
export const addNotes = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/notes', formData, config);

		dispatch({ type: ADD_NOTES, payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: NOTES_ERROR, payload: err });
	}
};

export const clearAdminError = () => (dispatch) => {
	dispatch({ type: CLEAR_ADMIN_ERRORS });
};

export const logout = () => (dispatch) => {
	dispatch({ type: ADMIN_LOGOUT });
};
