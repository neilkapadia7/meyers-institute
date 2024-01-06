const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Attendance = require('@models/SchoolDetails/Attendance');
const SchoolController = require('@controllers/SchoolDetails');
const adminMiddleware = require('../middleware/admin');
const auth = require('@middleware/auth');


// @route   POST    api/attendance/get
// @desc    Get All Attendance by ClassId
// @access  Private
router.post('/get', 
	auth,
	[
		check('liveClassId', 'Please Add Students').isString(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		SchoolController.getAttendanceByClass(req, res);
	}
);

// @route   POST    api/attendance/mark
// @desc    Add Attendance
// @access  Private
router.post(
	'/mark',
	[
		auth,
		[
			check('date', 'Please Add A Valid Date').isString(),
			check('students', 'Please Add Students').isArray(),
			check('batchId', 'Please Add Students').isString(),
			check('liveClassId', 'Please Add Students').isString(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		SchoolController.markAttendanceByClass(req, res);
	}
);

module.exports = router;
