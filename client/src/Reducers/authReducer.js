import { REGISTER_FAIL, REGISTER_SUCCESS } from '../Actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: false,
	user: null,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
				error: null,
			};
		case REGISTER_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
