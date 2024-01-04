const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('@models/User');
const AuthController = require('@controllers/auth');
const VoucherController = require('@controllers/Vouchers');
const auth = require('@middleware/auth');

// @route   GET    api/voucher
// @desc    Get all vouchers
// @access  Private
router.get('/', auth, VoucherController.getAllVouchers);

// @route   GET    api/voucher/:voucherId
// @desc    Get get voucher
// @access  Private
router.get('/:voucherId', auth, VoucherController.getVoucher);

// @route  POST    api/voucher/add
// @desc   Add Voucher
// @access   Private
router.post(
	'/add',
	[
		check('name', 'Please Include a Valid Email Id').isString(),
		check('expiryDate', 'Please enter Expiry Date'),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		VoucherController.addVoucher(req, res);
	}
);

// @route  POST    api/voucher/add
// @desc   Update Voucher
// @access   Private
router.post(
	'/updateVoucher',
	[
		check('expiryDate', 'Please enter Expiry Date').isString(),
		check('isActive', 'Please enter Active State').optional().isBoolean(),
		check('limit', 'Please enter limit').optional().isNumeric(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		VoucherController.updateVoucher(req, res);
	}
);

module.exports = router;
