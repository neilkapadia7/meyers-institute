const Users = require("@models/Users/User");
const Vouchers = require("@models/AdminControl/Vouchers");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {createUserToken} = require("@service/createToken")



module.exports = {

    // Post -  api/auth/login
    async loginUser(req, res) {
        const { email, password } = req.body;

		try {
			let user = await Users.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: 'Invalid Email Id / User not found' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid Password' });
			}

			let generateToken = await createUserToken(user.id);

            if(!generateToken.isError) {
                return res.status(200).json({token: generateToken.token});
            } else {
                console.log(generateToken.error)
                return res.status(400).json({message: "Server Error"});
            }
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ message: 'Server Error' });
		}
    },

    // Post -  api/auth/signup
    // Add new user
    async createUser(req, res) {
        const { name, email, password, referralCode, isPremiumUser, isFreeUser } = req.body;

		try {
			let user = await Users.findOne({ email });

			if (user) {
				return res.status(400).json({ message: 'User with email already exists' });
			}

            if(referralCode) {
                let checkVoucherValidity = await Vouchers.findOne({name: referralCode});
                if(!checkVoucherValidity) {
                    return res.status(400).json({ message: 'Invalid Voucher/Referral Code' });
                }

                let currentDate = new Date();
                if(currentDate > expiryDate) {
                    return res.status(400).json({ message: 'Voucher has expired' });
                }
                if(currentDate > checkVoucherValidity.expiryDate) {
                    return res.status(400).json({ message: 'Voucher has expired' });
                }
                if(!checkVoucherValidity.isActive) {
                    return res.status(400).json({ message: 'Voucher is not Active' });
                }
                if(checkVoucherValidity.redeemedCount == checkVoucherValidity.limit) {
                    return res.status(400).json({ message: 'Voucher limit exceeded' });
                }

                let referralUser = await Users.findById(checkVoucherValidity.userId);
                if(!referralUser) {
                    return res.status(400).json({ message: 'Referred User not found' });
                }

                referralUser.totalReferrals += 1;
                await referralUser.save();
            }

            const salt = await bcrypt.genSalt(10);

			let newPassword = await bcrypt.hash(password, salt);

            let newUser = await new Users({
                name,
                email,
                referralCode,
                password: newPassword,
                    // isAdminUser,
                isPremiumUser,
                isFreeUser,
            }).save()

            // instead of sharing the password in the response try sharing it in an email
            let generateToken = await createUserToken(newUser.id);

            if(!generateToken.isError) {
                return res.status(200).json({token: generateToken.token});
            } else {
                console.log(generateToken.error)
                return res.status(400).json({message: "Server Error"});
            }
			
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ message: 'Server Error' });
		}
    },

    // Post -  api/auth/passwordChange
    // Update User Password
    async updatePassword(req, res, user) {
        try {
            const {password} = req.body;
            const salt = await bcrypt.genSalt(10);

			let newPassword = await bcrypt.hash(password, salt);
            user.password = newPassword;
            await user.save();

            return res.status(200).json({message: "Success"});
        } catch (error) {
			console.error(error.message);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};