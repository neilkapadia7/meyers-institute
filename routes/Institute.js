const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('@models/Users/User');
const AuthController = require('@controllers/auth');
const TransactionController = require('@controllers/TransactionController');
const auth = require('@middleware/auth');

// @route   POST    api/institute/addInstitute
router.post(
	'/addInstitute', 
	auth, 
	[
		check('name', 'Please Include a Name').optional().isString(),
		check('image', 'Please enter image').optional().isString()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

	TransactionController.addInstitute(req, res)
	
	});

    // @route   POST    api/institute/updateInstitute
router.post(
	'/updateInstitute',
	[
		check('instituteId', 'Please Include instituteId').isString(),
		check('name', 'Please Include a Name').optional().isString(),
		check('image', 'Please enter image').optional().isString(),
        check('isActive', "Please add isActive").optional().isBoolean(),
	],
    auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		TransactionController.updateTransaction(req, res);
	}
);

module.exports = router;
