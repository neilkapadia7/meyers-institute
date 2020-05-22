import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Layout/Navbar';
import '../Layout/student.css';
import AddNotes from './AddNotes';
import GetNotes from './GetNotes';

const Notes = (props) => {
	return (
		<Fragment>
			<Navbar />
			<div id='student-sec1'>
				<div className='App'>
					<div>
						<GetNotes />
					</div>
					<div>
						<AddNotes />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Notes.propTypes = {};

export default Notes;
