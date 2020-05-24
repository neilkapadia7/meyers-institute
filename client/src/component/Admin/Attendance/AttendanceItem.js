import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AttendanceItem = ({ student }) => {
	const [attendance, setAttendance] = useState('');

	return (
		<div key={student._id}>
			<h2>{student.name}</h2>
			Present{' '}
			<input
				type='radio'
				value='Present'
				selected='true'
				checked={attendance === 'Present'}
				onChange={() => setAttendance('Present')}
			/>
			Absent{' '}
			<input
				type='radio'
				value='Absent'
				checked={attendance === 'Absent'}
				onChange={() => setAttendance('Absent')}
			/>
		</div>
	);
};

AttendanceItem.propTypes = {
	student: PropTypes.array,
};

export default AttendanceItem;
