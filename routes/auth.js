const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('@models/User');
const AuthController = require('@controllers/Auth');
const auth = require('@middleware/auth');

// @route   GET    api/auth
// @desc    Get Logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST    api/auth/login
// @desc   User LogIn
// @access   Public
router.post(
	'/login',
	[
		check('email', 'Please Include a Valid Email Id').isEmail(),
		check('password', 'Please enter your password').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		AuthController.loginUser(req, res);
	}
);

// @route  POST    api/auth/signup
// @desc   User Creation
// @access  Public
router.post(
	'/signup',
	[
		check('name', 'Please Include Name').isString(),
		check('email', 'Please Include a Valid Email Id').isEmail(),
		check('password', 'Please enter your password').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		AuthController.createUser(req, res);
	}
);

// @route  POST    api/auth/passwordChange
// @desc   User Password Update
// @access  Public
router.post(
	'/passwordChange',
	[
		check('email', 'Please Include a Valid Email Id').isEmail(),
		check('password', 'Please enter your password').not().isEmpty(),
	],
	auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const checkUser = await User.findOne({email});
		if(req.isAdminUser || (checkUser && checkUser._id == req.userId)) {
			AuthController.updatePassword(req, res, checkUser);
		}
		else {
			return res.status(400).json({ message: "Invalid Access" });
		}
	}
);

module.exports = router;
