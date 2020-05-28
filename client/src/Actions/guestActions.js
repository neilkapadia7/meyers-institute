import axios from 'axios';

export const addQuery = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	console.log('Action Called');

	try {
		const res = await axios.post('/api/guest', formData, config);

		dispatch({ type: 'POST_GUEST_QUERY', payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: 'GUEST_ERROR', payload: err });
	}
};
