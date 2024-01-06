const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('@models/User');
const StudentPaymentController = require('@controllers/StudentPayments');
const auth = require('@middleware/auth');

// /student/payment

router.post(
    '/get', 
    [
		check('batchId', 'Please Include a batchId').isString(),
		check('studentId', 'Please enter studentId').isString(),
		],
    auth, 
    async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		StudentPaymentController.getPaymentByStudent(req, res);
	});
router.post(
	'/add',
	[
		check('isMarkedPaid', 'Please Include a isMarkedPaid').isBoolean(),
		check('studentId', 'Please enter studentId').isString(),
		check('batchId', 'Please enter batchId').isNumeric(),
		check('totalPaidAmount', 'Please enter totalPaidAmount').isNumeric(),
		check('discountedAmount', 'Please enter discountedAmount').isNumeric(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		StudentPaymentController.addPayment(req, res);
	}
);

router.post(
	'/update',
	[
		check('isMarkedPaid', 'Please enter isMarkedPaid').optional().isBoolean(),
		check('paymentId', 'Please enter paymentId').isString(),
		check('studentId', 'Please enter studentId').isString(),
		check('batchId', 'Please enter batchId').optional().isString(),
		check('totalPaidAmount', 'Please enter startDate').optional().isNumeric(),
		check('discountedAmount', 'Please enter discountedAmount').optional().isNumeric(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		StudentPaymentController.updateStudentPayment(req, res);
	}
);


module.exports = router;
