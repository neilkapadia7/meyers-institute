const Users = require("@models/Users/User");
const Vouchers = require("@models/AdminControl/Vouchers");
const moment = require("moment");

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
        try {
            let query = {_id: req.params.voucherId};
            if(!req.isAdminUser) {
                let user = await Users.findById(req.userId);

                if (!user) {
                    return res.status(400).json({ msg: 'Invalid User' });
                }

                query = {...query, userId: req.userId}; // return the vouchers created by a single user
            }

            let voucher = await Vouchers.findOne(query);

            return res.status(200).json(voucher);

		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
    },

    // Post -  api/voucher/add
    // Add new voucher
    async addVoucher(req, res) {
		try {
            let {expiryDate, name, userId} = req.body;

            if(!name) {
                return res.status(400).json({message: "Enter Valid Name"});
            }

            if(moment(expiryDate) < moment()) {
                return res.status(400).json({message: "Enter Valid Expiry Date"});
            }

            let checkUser = await Users.findById(userId);
            if(!checkUser) {
                return res.status(400).json({message: "Invalid User"});
            }

            let checkVoucher = await Vouchers.findOne({name: { '$regex' : name, '$options' : 'i'}});
            if(!checkVoucher) {
                return res.status(400).json({message: "Voucher Name is already taken"});
            }

            let voucher = await new Vouchers({
                expiryDate,
                name,
                userId,
            })

            return res.status(200).json(voucher);
			
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
    },

    // Post -  api/voucher/updateVoucher
    // Update Voucher
    async updateVoucher(req, res, user) {
        try {
            const {voucherId, expiryDate, name, isActive, limit} = req.body;

            let voucher = await Vouchers.findOne({userId: req.userId, _id: voucherId});
            if(!voucher) {
                return res.status(400).json({message: "Voucher not found"});
            }

            if(expiryDate) {
                if(moment(expiryDate) < moment()) {
                    return res.status(400).json({message: "Enter Valid Expiry Date"});
                }
                voucher.expiryDate = expiryDate;
            }

            if(isActive) {
                if(moment(voucher.expiryDate) < moment()) {
                    return res.status(400).json({message: "Enter Valid Expiry Date"});
                }
                voucher.isActive = isActive;
            }

            if(limit) {
                if(limit < redeemedCount) {
                    return res.status(400).json({message: "Please enter a valid limit"});
                }
                voucher.limit = limit;
            }

            await voucher.save();

            return res.status(200).json(voucher);
        } catch (error) {
			console.error(error.message);
            res.status(500).json({ msg: 'Server Error' });
        }
    }
};