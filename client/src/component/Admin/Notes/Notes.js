import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Layout/Navbar';
import '../Layout/student.css';

const Notes = (props) => {
	return (
		<Fragment>
			<Navbar />
			<div id='student-sec1'>
				<div className='App'>
					<h1 className='title-size2'>Notes</h1>
				</div>
			</div>
		</Fragment>
	);
};

Notes.propTypes = {};

export default Notes;
