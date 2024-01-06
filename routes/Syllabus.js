const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('@models/Users/User');
const SyllabusController = require('@controllers/SyllabusController');
const auth = require('@middleware/auth');

// @route   GET    api/syllabus/get
router.get('/get', auth, async (req, res) => SyllabusController.getAllSyllabus(req, res));

// @route   POST    api/syllabus/getByBatch/
router.post('/getByBatch', 
	[
		check('batchId', 'Please add batchId').isString()
	],
	auth, 
	async (req, res) => {
        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

        SyllabusController.getStudentByBatch(req, res);
    });

// @route  POST    api/syllabus/add
router.post(
	'/add',
	[
		check('subjectName', 'Please Include a subjectName').isString(),
		check('syllabus', 'Please Add Syllabus').isArray(),
		check('batchId', 'Please Include a batch').isString(),
		check('userId', 'Please add userId').isString(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		SyllabusController.addSyllabus(req, res);
	}
);

// @route  POST    api/syllabus/update
router.post(
	'/update',
	[
		check('syllabusId', 'Please Include a syllabusId').isString(),
		check('subjectName', 'Please Include a subjectName').optional().isString(),
		check('syllabus', 'Please Add Syllabus').optional().isArray(),
		check('batchId', 'Please Include a batch').optional().isString(),
		check('userId', 'Please add userId').optional().isString(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		SyllabusController.updateSyllabus(req, res);
	}
);

module.exports = router;
