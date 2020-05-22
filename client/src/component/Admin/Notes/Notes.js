import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Layout/Navbar';
import '../Layout/student.css';
import AddNotes from './AddNotes';
import GetNotes from './GetNotes';
import { connect } from 'react-redux';
import { getNotes } from '../../../Actions/adminActions';

const Notes = ({ notes, getNotes }) => {
	useEffect(() => {
		getNotes();
	}, []);

	return (
		<Fragment>
			<Navbar />
			<div id='student-sec1'>
				<div className='App'>
					<div className='student-flex'>
						<div className='students-left'>
							<GetNotes notes={notes} />
						</div>
						<div className='students-right'>
							<AddNotes />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Notes.propTypes = {
	notes: PropTypes.array,
	getNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	notes: state.admin.notes,
});

export default connect(mapStateToProps, { getNotes })(Notes);
