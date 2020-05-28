import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import guestReducer from './guestReducer';

export default combineReducers({
	auth: authReducer,
	admin: adminReducer,
	guest: guestReducer,
});
