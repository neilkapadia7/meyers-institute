const Users = require("@models/User");
const Vouchers = require("@models/Vouchers/Vouchers");


module.exports = {

    // Post -  api/auth/login
    async loginUser(req, res) {
        const { email, password } = req.body;

		try {
			let user = await Users.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Email Id / User not found' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Password' });
			}

			const payload = {
				user: {
					id: user.id,
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
			res.status(500).json({ msg: 'Server Error' });
		}
    },

    // Post -  api/auth/signup
    // Add new user
    async createUser(req, res) {
        const { name, email, password, referralCode } = req.body;

		try {
			let user = await Users.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'User with email already exists' });
			}

            if(referralCode) {
                let checkVoucherValidity = await Vouchers.findOne({name: referralCode});
                if(!checkVoucherValidity) {
                    return res.status(400).json({ msg: 'Invalid Voucher/Referral Code' });
                }

                let currentDate = new Date();
                if(currentDate > expiryDate) {
                    return res.status(400).json({ msg: 'Voucher has expired' });
                }
                if(currentDate > checkVoucherValidity.expiryDate) {
                    return res.status(400).json({ msg: 'Voucher has expired' });
                }
                if(!checkVoucherValidity.isActive) {
                    return res.status(400).json({ msg: 'Voucher is not Active' });
                }
                if(checkVoucherValidity.redeemedCount == checkVoucherValidity.limit) {
                    return res.status(400).json({ msg: 'Voucher limit exceeded' });
                }

                let referralUser = await Users.findById(checkVoucherValidity.userId);
                if(!referralUser) {
                    return res.status(400).json({ msg: 'Referred User not found' });
                }

                referralUser.totalReferrals += 1;
                await referralUser.save();

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
                return res.status(200).json({ 
                    ...newUser,
                    password
                });
            }
			
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
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
            res.status(500).json({ msg: 'Server Error' });
        }
    }
};