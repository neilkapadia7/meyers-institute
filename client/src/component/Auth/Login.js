import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, loadUser } from '../../Actions/authActions';

const Login = (props) => {
	const {
		login,
		loadUser,
		auth: { isAuthenticated, error },
	} = props;

	useEffect(() => {
		loadUser();

		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error) {
			console.log(error);
		}
	}, [loadUser, isAuthenticated, error]);

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
	loadUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { login, loadUser })(Login);
