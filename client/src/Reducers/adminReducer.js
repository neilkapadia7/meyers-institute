import {
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGIN_FAIL,
	ADMIN_USER_LOADED,
	ADMIN_AUTH_ERROR,
} from '../Actions/types';

const initialState = {
	token: localStorage.getItem('admin'),
	admin_isAuthenticated: false,
	admin_loading: false,
	admin_user: null,
	admin_error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADMIN_USER_LOADED:
			return {
				...state,
				admin_isAuthenticated: true,
				admin_loading: false,
				admin_user: action.payload,
				admin_error: null,
			};
		case ADMIN_LOGIN_SUCCESS:
			localStorage.setItem('admin', action.payload.token);
			return {
				...state,
				...action.payload,
				admin_isAuthenticated: true,
				admin_loading: false,
				admin_error: null,
			};
		case ADMIN_AUTH_ERROR:
		case ADMIN_LOGIN_FAIL:
			localStorage.removeItem('admin');
			return {
				...state,
				token: null,
				admin_isAuthenticated: false,
				admin_user: null,
				admin_error: action.payload,
				admin_loading: false,
			};
		default:
			return state;
	}
};
