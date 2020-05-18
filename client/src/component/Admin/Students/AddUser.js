import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../../../Actions/adminActions';

const AddUser = (props) => {
	const { createUser } = props;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCpassword] = useState('');

	const submit = (e) => {
		e.preventDefault();

		if (password !== cpassword) {
			console.log("Passowrd Doesn't Match");
		} else {
			createUser({
				name,
				email,
				password,
			});

			setName('');
			setEmail('');
			setPassword('');
			setCpassword('');
		}
	};

	return (
		<Fragment>
			{/* <div id='home-sec1'> */}
			<div>
				<form onSubmit={submit} className='student-form'>
					<h2 className='title-size2'>Create Account</h2>
					<div className='student-input-div'>
						<label className='student-label'>Name</label>
						<input
							type='text'
							placeholder='Enter Your Name'
							onChange={(e) => setName(e.target.value)}
							required
							className='student-input'
						/>
					</div>
					<div className='student-input-div'>
						<label className='student-label'>Email ID</label>
						<input
							type='email'
							placeholder='Enter Your Email ID'
							onChange={(e) => setEmail(e.target.value)}
							required
							className='student-input'
						/>
					</div>
					<div className='student-input-div'>
						<label className='student-label'>Password</label>
						<input
							type='password'
							placeholder='Enter Password'
							onChange={(e) => setPassword(e.target.value)}
							required
							className='student-input'
						/>
					</div>
					<div className='student-input-div'>
						<label className='student-label'>Confirm Password</label>
						<input
							type='password'
							placeholder='Confirm Password'
							onChange={(e) => setCpassword(e.target.value)}
							required
							className='student-input'
						/>
						<input type='submit' value='Register' className='student-button' />
					</div>
				</form>
			</div>
			{/* </div> */}
		</Fragment>
	);
};

AddUser.propTypes = {
	createUser: PropTypes.func.isRequired,
};

export default connect(null, { createUser })(AddUser);
