const Users = require("@models/User");
const Vouchers = require("@models/Vouchers/Vouchers");


module.exports = {
    // Post -  api/voucher/get
    async getAllVouchers(req, res) {
		try {
            let { page, search, isCSV } = req.body;
            let query = {};

            if(!req.isAdminUser) {
                let user = await Users.findById(req.userId);

                if (!user) {
                    return res.status(400).json({ msg: 'Invalid User' });
                }

                query = {...query, userId: req.userId}; // return the vouchers created by a single user
            }

            if(search) {
                query = {...query, name: { $regex: new RegExp(search, 'i') } };
            }

            let pageNo = 1;
            if (page) {
                pageNo = page;
            }

            let total = await Vouchers.countDocuments(query);
            let vouchers = await Vouchers.find(query)
                .skip(25 * pageNo - 25)
                .limit(isCSV ? total : 25)
                .sort({createdAt:-1})
                .lean();

            return res.status(200).json(vouchers);
            
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
    },

    // api/voucher/get/:voucherId
    async getVoucher (req, res) {

    },

    // Post -  api/voucher/add
    // Add new voucher
    async addVoucher(req, res) {
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

    // Post -  api/voucher/updateVoucher
    // Update Voucher
    async updateVoucher(req, res, user) {
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