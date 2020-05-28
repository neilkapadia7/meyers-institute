const initialState = {
	query: null,
	result: null,
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GUEST_LOADING':
			return {
				...state,
				loading: true,
			};
		case 'POST_GUEST_QUERY':
			return {
				...state,
				query: action.payload,
				loading: false,
			};
		case 'GUEST_ERROR':
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
