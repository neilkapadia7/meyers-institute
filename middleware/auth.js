const jwt = require('jsonwebtoken');
const config = require('config');
const Users = require("@models/Users/User");

module.exports = async function (req, res, next) {
	const token = req.header('x-auth-token');

	if (!token) {
		return res.status(402).json({ msg: 'No Token, Authorization Denied' });
	}
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user._id;
		req.userId = decoded.user._id;
		// req.email = decoded.user;

		req.isAdminUser =false;
		let checkUser = await Users.findById({_id: req.user}, {isAdminUser});
		if(checkUser) {
			if(checkUser.isAdminUser)
				req.isAdminUser = checkUser.isAdminUser
		} else {
			return res.status(401).json({ msg: 'User not found' });
		}

		
		next();
	} catch (err) {
		return res.status(401).json({ msg: 'Token is not Valid' });
	}
};
