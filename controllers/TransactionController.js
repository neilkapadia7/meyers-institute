const Institute = require('@models/Institute');
const User = require('@models/Users/User');


module.exports = {
    async getAllTransactions(req, res) {
        try {
            
        } catch (error) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    
    async addTransaction(req, res) {
        try {
            
        } catch (error) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // Institute
    // api/institute/addInstitute
    async addInstitute(req, res) {
        try {
            let {name, image} = req.body;
            let checkInstitute = await Institute.findOne({adminId: req.userId});
            if(checkInstitute) {
                return res.status(401).json({message: "Institute for Admin already Exists"})
            }

            let newInstitute = await new Institute({
                name,
                image,
                adminId: req.userId
            }).save();

            let getUser = await User.findById(req.userId);
            getUser.instituteId = newInstitute._id;
            await getUser.save();

            return res.status(200).json({message: "Success", data: newInstitute});
        } catch (error) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    
    // api/institute/updateInstitute
    async updateTransaction(req, res) {
        try {
            let {instituteId, name, image, isActive} = req.body;
            let checkInstitute = await Institute.findById(instituteId);

            if(req.body.hasOwnProperty("isActive")) {
                checkInstitute.isActive = isActive;
            }
            if(req.body.hasOwnProperty("name")) {
                checkInstitute.name = name;
            }
            if(req.body.hasOwnProperty("image")) {
                checkInstitute.image = image;
            }

            await checkInstitute.save();

            return res.status(200).json({message: "Success", data: checkInstitute});
        } catch (error) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
        }
    },

}