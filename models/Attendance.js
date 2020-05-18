const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	students: {
		type: Array,
		required: true,
	},
});

module.exports = mongoose.model('attendance', AttendanceSchema);
