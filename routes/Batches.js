const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('@models/User');
const BatchController = require('@controllers/SchoolDetails');
const auth = require('@middleware/auth');

// @route   POST    api/batch/get
// @desc    Get all batches
// @access  Private
router.post('/get', auth, BatchController.getAllBatches);

// @route   GET    api/batch/get/:batchId
// @desc    Get get batch
// @access  Private
router.get('/get/:batchId', auth, BatchController.getBatch);

// @route  POST    api/batch/add
// @desc   Add Batch
// @access   Private
router.post(
	'/add',
	[
		check('name', 'Please Include a Name').isString(),
		check('startDate', 'Please enter startDate').isString(),
		check('endDate', 'Please enter endDate').isString(),
		check('coursePrice', 'Please enter coursePrice').isNumeric(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		BatchController.addBatch(req, res);
	}
);

// @route  POST    api/batch/update
// @desc   Update batch
// @access   Private
router.post(
	'/update',
	[
		check('batchId', 'Please enter Expiry Date').isString(),
		check('isActive', 'Please enter Active State').optional().isBoolean(),
		check('name', 'Please enter limit').optional().isString(),
		check('startDate', 'Please enter startDate').optional().isString(),
		check('endDate', 'Please enter endDate').optional().isString(),
		check('coursePrice', 'Please enter coursePrice').optional().isNumeric(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		BatchController.updateBatch(req, res);
	}
);

module.exports = router;
