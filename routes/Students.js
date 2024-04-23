const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('@models/Users/User');
const AuthController = require('@controllers/Auth');
const StudentController = require('@controllers/SchoolDetails');
const auth = require('@middleware/auth');

// @route   POST    api/student/get
// @desc    Get all students
// @access  Private
router.post('/get', auth, StudentController.getAllStudents);

// @route   POST    api/student/getByBatch/
// @desc    Get get all students by batch
// @access  Private
router.post('/getByBatch', 
	[
		check('batchId', 'Please add batchId').isString()
	],
	auth, 
	StudentController.getStudentByBatch);

// @route  POST    api/student/add
// @desc   Add Student
// @access   Private
router.post(
	'/add',
	[
		check('name', 'Please Include a name').isString(),
		check('email', 'Please Include an email').isString(),
		check('currentBatch', 'Please Include an current batch').isString(),
		check('userId', 'Please add userId').isString().optional(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		StudentController.addStudent(req, res);
	}
);

// @route  POST    api/student/updateStudent
// @desc   Update Voucher
// @access   Private
router.post(
	'/updateStudent',
	[
		check('studentId', 'Please enter studentId Date').isString(),
		// check('isActive', 'Please enter Active State').optional().isBoolean(),
		// check('limit', 'Please enter limit').optional().isNumeric(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		StudentController.updateStudent(req, res);
	}
);

module.exports = router;
