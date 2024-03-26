const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('@middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Admin = require('../models/Admin');
const AdminController = require('@controllers/AdminController');
const AuthController = require('@controllers/Auth');

// Deprecated
router.post(
	'/',
	[
		check('name', 'Please Enter your Name').not().isEmpty(),
		check('email', 'Please Enter a valid Email ID').isEmail(),
		check(
			'password',
			'Please Enter A Password with 6 or More Character'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let admin = await Admin.findOne({ email });

			if (admin) {
				return res.status(400).json({ msg: 'Admin User Already Exists!' });
			}

			admin = new Admin({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			admin.password = await bcrypt.hash(password, salt);

			await admin.save();

			const payload = {
				user: {
					id: admin.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 3600,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// ADMIN ACTIONS -----------------------------------------------------------------------

// @route   GET    api/admin/getAllUsers
// @desc    Get All Users
// @access  Private
router.get('/getAllUsers',
	auth,
	async (req, res) => {
		if(!req.isAdminUser) {
			return res.status(401).json({message: "Invalid Access"})
		}

		AdminController.getAllUsers(req, res);
	}
);


// @route  POST    api/admin/addNewUser
// @desc   Update User Access
// @access   Private
router.post(
	'/addNewUser',
	[
		check('name', 'Please Include a Name').isString(),
		check('email', 'Please Include a Valid Email Id').isString(),
		check('password', 'Please Include a password').isString(),
		check('isFreeUser', 'Please Include a isFreeUser').isBoolean().optional(),
		check('referralCode', 'Please Include referralCode').isString().optional(),
		check('isPremiumUser', 'Please Include isPremiumUser').isBoolean().optional(),
		check('accessType', 'Please Include accessType').isString(),
		check('isAdminUser', 'Please Include isAdminUser').isString(),
		check('instituteId', 'Please Include instituteId').isString().optional(),
		check('expiryDate', 'Please enter your expiryDate').isString(), // Expiry Module
		check('isUnlimited', 'Please enter your isUnlimited').isBoolean(), // Expiry Module
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		if(!req.isAdminUser) {
			return res.status(401).json({message: "Invalid Access"})
		}

		AdminController.addNewUser(req, res);
	}
);

// @route  POST    api/admin/updateAccess
// @desc   Update User Access
// @access   Private
router.post(
	'/updateAccess',
	[
		check('userId', 'Please Include a userId').isString(),
		check('expiryDate', 'Please enter your expiryDate').isString(),
		check('terminateAccess', 'Please enter terminateAccess').isBoolean(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		if(!req.isAdminUser) {
			return res.status(401).json({message: "Invalid Access"})
		}

		AdminController.updateUserAccess(req, res);
	}
);


// @route  POST    api/admin/passwordChange
// @desc   User Password Update
// @access  Prive
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


// @route  POST    api/admin/addInstitutes
// @desc   Add Institutes
// @access   Private
router.post(
	'/addInstitute',
	[
		check('image', 'Please Include an image').isString().optional(),
		check('name', 'Please enter name').isString(),
		check('adminId', 'Please enter adminId').isString(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		if(!req.isAdminUser) {
			return res.status(401).json({message: "Invalid Access"})
		}

		AdminController.addInstitute(req, res);
	}
);

// @route  POST    api/admin/updateInstitute
// @desc   Update Institutes
// @access   Private
router.post(
	'/addInstitute',
	[
		check('instituteId', 'Please add instituteId').isString(),
		check('image', 'Please Include an image').isString().optional(),
		check('name', 'Please enter name').isString(),
		check('adminId', 'Please enter adminId').isString(),
		check('instructorList', 'Please add instructorList').isArray().optional(),
		check('isActive', 'Please enter isActive').isBoolean().optional(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		if(!req.isAdminUser) {
			return res.status(401).json({message: "Invalid Access"})
		}

		AdminController.updateInstitute(req, res);
	}
);



module.exports = router;
