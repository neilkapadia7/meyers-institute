import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
} from './types';

export const register = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/users', formData, config);

		dispatch({ type: REGISTER_SUCCESS, payload: res.data });
	} catch (err) {
		dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
	}
};

export const login = (formData) => async (dispatch) => {
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
};
