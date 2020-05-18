import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getStudents } from '../../../Actions/adminActions';
import AddUser from './AddUser';
import GetStudents from './GetStudents';
import Navbar from '../Layout/Navbar';
import PropTypes from 'prop-types';
import '../Layout/student.css';

const Students = ({ getStudents, students }) => {
	useEffect(() => {
		getStudents();
	}, []);

	return (
		<Fragment>
			<Navbar />
			<div id='student-sec1'>
				<div className='App'>
					<div className='student-flex'>
						<div className='students-left'>
							<GetStudents students={students} />
						</div>
						<div className='students-right'>
							<AddUser />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Students.propTypes = {
	students: PropTypes.array,
};

const mapsStateToProps = (state) => ({
	students: state.admin.students,
});

export default connect(mapsStateToProps, { getStudents })(Students);
