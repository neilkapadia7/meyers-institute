const Syllabus = require("@models/SchoolDetails/Syllabus");
const Students = require("@models/SchoolDetails/Students");
const Users = require("@models/Users/User");
const UserExpiryDetails = require("@models/Users/UserExpiry");
const Batches = require("@models/SchoolDetails/Batches");
const Attendance = require('@models/SchoolDetails/Attendance');
const LiveClasses = require('@models/SchoolDetails/LiveClasses');
const Institute = require('@models/Institute');
const bcrypt = require('bcryptjs');


let accessTypes = ["Instructor", "InstituteAdmin", "BatchAdmin"];

module.exports = {
    // GET api/admin/getAllUsers
    async getAllUsers(req, res) {
        try {
            let user = await Users.find({});
            if(!user[0]) {
                return res.status(400).json({message: "No Users Found"});
            }

            return res.status(200).json({data: user, message: "Success"});
        } catch (error) {
            console.error(err.message);
			res.status(500).json({ msg: 'Server Error' }); 
        }
    },

    // POST  api/admin/addNewUser
    async addNewUser(req, res) {
        try {
            let {name, email, password, isFreeUser, referralCode, isPremiumUser, accessType, isAdminUser, instituteId, expiryDate, isUnlimited} = req.body;
            let user = await Users.findOne({email});
            if(user) {
                return res.status(400).json({message: "User With Email ID Already Exists"});
            }

            let newAccount = new Users({email, name});

            if(referralCode) {
                let checkReferralValid = await Users.findOne({referralCode});
                if(!checkReferralValid) {
                    return res.status(400).json({message: "Invalid Referral Code"});
                }
                newAccount.referredBy = checkReferralValid._id;
            }

            const salt = await bcrypt.genSalt(10);

			let newPassword = await bcrypt.hash(password, salt);
            newAccount.password = newPassword;

            if(isFreeUser) {
                newAccount.isFreeUser = isFreeUser;
            }
            
            if(isPremiumUser) {
                newAccount.isPremiumUser = isPremiumUser;
            }
            
            if(isAdminUser) {
                newAccount.isAdminUser = isAdminUser;
            }
            
            let checkInstitute;
            if(instituteId) {
                checkInstitute = await Institute.findById(instituteId);
                if(!checkInstitute) {
                    return res.status(400).json({message: "Invalid Institute"});
                }
                newAccount.instituteId = instituteId;
            }
            
            if(accessTypes.includes(accessType)) {
                newAccount.accessType = accessType;
            }

            await newAccount.save();


            if(accessType == 'Instructor' || accessType == 'BatchAdmin') {
                checkInstitute.instructorList.push(newAccount._id);
            } else if(accessType == 'InstituteAdmin') {
                checkInstitute.adminId = newAccount._id;
            }

            await checkInstitute.save();

            let startDate = new Date();
            let expiry = new UserExpiryDetails({
                expiryDate,
                isUnlimited,
                startDate: startDate,
                userId: newAccount._id,
                history: [
                    {
                        isFreeAccess: isFreeUser,
                        expiryDate: expiryDate,
                        startDate: startDate,
                    }
                ]
            }).save();

            return res.status(200).json({data: newAccount, message: "Success"});
        } catch (error) {
            console.error(err.message);
			res.status(500).json({ msg: 'Server Error' }); 
        }
    },

    // POST    api/admin/updateAccess
    async updateUserAccess(req, res) {
        try {
            let {userId, expiryDate, terminateAccess} = req.body;

            if(expiryDate < new Date()) {
                return res.status(400).json({message: "End date cannot be less than current date"});
            }

            let userAccess = await UserExpiryDetails.findOne({userId});
            if(!userAccess) {
                return res.status(400).json({message: "No Access Data Found!"});
            }

            if(terminateAccess) {
                let user = await Users.findById({userId});
                if(!user) {
                    return res.status(400).json({message: "User Not Found!"})
                }

                user.isActive = false;
                await user.save();
                return res.status(200).json({message: 'Success', data: []});
            }

            userAccess.expiryDate = expiryDate;
            userAccess.history.push({
                expiryDate,
                startDate,
                updatedAt: new Date(),
                updatedBy: req.userId
            });

            await userAccess.save();
            
            return res.status(200).json({message: 'Success', data: userAccess});
        } catch (error) {
            console.error(err.message);
			res.status(500).json({ msg: 'Server Error' }); 
        }
    },


    // Institutes
}