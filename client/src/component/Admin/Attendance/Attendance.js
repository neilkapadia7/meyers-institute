import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Layout/Navbar';
import AddAttendance from './AddAttendance';
import GetAttendance from './GetAttendance';
import '../Layout/student.css';

import { connect } from 'react-redux';
import { getStudents } from '../../../Actions/adminActions';

const Attendance = ({ getStudents, students }) => {
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
							<GetAttendance />
						</div>
						<div className='students-right'>
							<AddAttendance students={students} />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Attendance.propTypes = {
	getStudents: PropTypes.func.isRequired,
	students: PropTypes.array,
};

const mapStateToProps = (state) => ({
	students: state.admin.students,
});

export default connect(mapStateToProps, { getStudents })(Attendance);
