import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register, loadUser } from '../../Actions/authActions';

const Register = (props) => {
	const {
		auth: { isAuthenticated, error },
		register,
		loadUser,
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

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCpassword] = useState('');

	const submit = (e) => {
		e.preventDefault();

		if (password !== cpassword) {
			console.log("Passowrd Doesn't Match");
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div>
			<form onSubmit={submit}>
				<input
					type='text'
					placeholder='Enter Your Name'
					onChange={(e) => setName(e.target.value)}
					required
				/>
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
				<input
					type='password'
					placeholder='Confirm Password'
					onChange={(e) => setCpassword(e.target.value)}
					required
				/>
				<input type='submit' value='Register' />
			</form>
		</div>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { register, loadUser })(Register);
