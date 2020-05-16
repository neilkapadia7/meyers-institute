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
		if (localStorage.token) {
			loadUser();
		}

		if (isAuthenticated) {
			props.history.push('/home');
		}

		if (error) {
			console.log(error);
		}
	}, [localStorage, loadUser, isAuthenticated, error]);

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
		<div id='home-sec1'>
			<div className='App-Auth'>
				<form onSubmit={submit} className='auth-form'>
					<h2>Login</h2>
					<div className='auth-input-div'>
						<label className='auth-label'>Email ID</label>
						<input
							type='email'
							placeholder='Enter Your Email ID'
							onChange={(e) => setEmail(e.target.value)}
							required
							className='auth-input'
						/>
					</div>
					<div className='auth-input-div'>
						<label className='auth-label'>Password</label>
						<input
							type='password'
							placeholder='Enter Password'
							onChange={(e) => setPassword(e.target.value)}
							required
							className='auth-input'
						/>
					</div>
					<input type='submit' value='Login' className='auth-button' />
				</form>
			</div>
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
