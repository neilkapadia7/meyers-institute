import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Layout/Navbar';
import AddAttendance from './AddAttendance';
import GetAttendance from './GetAttendance';
import '../Layout/student.css';

import { connect } from 'react-redux';
import { getStudents, getAttendance } from '../../../Actions/adminActions';

const Attendance = ({ getStudents, getAttendance, students, attendance }) => {
	useEffect(() => {
		getStudents();
		getAttendance();
	}, []);

	return (
		<Fragment>
			<Navbar />
			<div id='student-sec1'>
				<div className='App'>
					<div className='student-flex'>
						<div className='students-left'>
							<GetAttendance attendance={attendance} />
						</div>
						<div className='students-right'>
							<AddAttendance student={students} />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Attendance.propTypes = {
	getStudents: PropTypes.func.isRequired,
	getAttendance: PropTypes.func.isRequired,
	students: PropTypes.array,
	attendance: PropTypes.object,
};

const mapStateToProps = (state) => ({
	students: state.admin.students,
	attendance: state.admin.attendance,
});

export default connect(mapStateToProps, { getStudents, getAttendance })(
	Attendance
);
