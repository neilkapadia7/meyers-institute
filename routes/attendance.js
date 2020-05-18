const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Attendance = require('../models/Attendance');
const adminMiddleware = require('../middleware/admin');

// @route   GET    api/admin/attendance
// @desc    Get All Attendance
// @access  Private
router.get('/', adminMiddleware, async (req, res) => {
	try {
		const attendance = await Attendance.find().sort(-date);
		res.json(attendance);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post(
	'/',
	[
		adminMiddleware,
		[
			check('date', 'Please Add A Valid Date').not().isEmpty(),
			check('students', 'Please Add Students').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { date, students } = req;

		try {
			let attendance = await Attendance.findOne({ date });

			if (attendance) {
				return res
					.status(400)
					.json({ msg: 'Already Entered Attendance for this date' });
			}

			await attendance.save();

			res.json(attendance);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
