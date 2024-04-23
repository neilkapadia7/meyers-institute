const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('@models/Users/User');
const AuthController = require('@controllers/Auth');
const TransactionController = require('@controllers/TransactionController');
const auth = require('@middleware/auth');

// @route   POST    api/transactions/getAllTransaction
router.post(
	'/get', 
	auth, 
	[
		check('packageId', 'Please Include a Name').optional().isString(),
		check('startDate', 'Please enter valid start date').optional().isString(),
		check('endDate', 'Please enter valid end date').optional().isString(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

	TransactionController.getAllTransactions(req, res)
	
	});

// @route   GET    api/transactions/get/:voucherId
// router.get('/get/:voucherId', auth, TransactionController.getVoucher);

// @route  POST    api/transactions/package
router.post(
	'/add',
	[
		check('packageId', 'Please Include a packageId').isString(),
		check('voucherId', 'Please enter Expiry voucherId').isString(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		TransactionController.addTransaction(req, res);
	}
);

module.exports = router;
