import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../Actions/authActions';

const Login = ({ login }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submit = (e) => {
		e.preventDefault();

		if (email === '' || password === '') {
			console.log('Please Enter All the Fields!');
		} else {
			login({
				email,
				password,
			});
		}
	};

	return (
		<div>
			<form onSubmit={submit}>
				<input
					type='email'
					placeholder='Enter Your Email ID'
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Enter Password'
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input type='submit' value='Login' />
			</form>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
