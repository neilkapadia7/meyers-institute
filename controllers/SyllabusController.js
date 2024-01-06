const Syllabus = require("@models/SchoolDetails/Syllabus");
const Students = require("@models/SchoolDetails/Students");
const Users = require("@models/Users/User");
const Batches = require("@models/SchoolDetails/Batches");
const Attendance = require('@models/SchoolDetails/Attendance');
const LiveClasses = require('@models/SchoolDetails/LiveClasses');


module.exports = {
    // GET api/syllabus/get
    async getAllSyllabus(req, res) {
        try {
            let query = {};
            let user = await Users.findOne({_id: req.userId});
            if(!user) {
                return res.status(400).json({message: "User Not Found"});
            }

            if(!user.isAdminUser) {
                query = {userId: user._id};
            }

            let syllabus = await Syllabus.find(query);

            return res.status(200).json(syllabus);
        } catch (error) {
            console.error(err.message);
			res.status(500).json({ msg: 'Server Error' }); 
        }
    },

    // POST api/syllabus/getByBatch/
    async getStudentByBatch(req, res) {
        try {
            let {batchId} = req.body;
            let query = {batchId: batchId};
            let user = await Users.findOne({_id: req.userId});
            if(!user) {
                return res.status(400).json({message: "User Not Found"});
            }

            if(!user.isAdminUser) {
                query = {userId: user._id};
            }

            let syllabus = await Syllabus.find(query);

            return res.status(200).json(syllabus);
        } catch (error) {
            console.error(err.message);
			res.status(500).json({ msg: 'Server Error' }); 
        }
    },

    // POST    api/syllabus/add
    async addSyllabus(req, res) {
        try {
            let {batchId, syllabus, subjectName} = req.body;

            let checkBatch = await Batches.findOne({_id: batchId});
            if(!checkBatch) {
                return res.status(400).json({message: "Batch Not Found"});
            }

            let incorrectFormat = false;
            syllabus.forEach(element => {
                if(!element.title || !element.sequenceNo) {
                    incorrectFormat = true;
                }

                if(element.subtopics[0]) {
                    element.subtopics.forEach(subEl => {
                        if(!subEl.subtopicTitle  || !subEl.sequenceNo) {
                            incorrectFormat = true;
                        }
                    })
                } 
            });

            if(incorrectFormat) {
                return res.status(400).json({message: "Syllabus Format is incorrect"});
            }

            let syllabusDetails = await new Syllabus({
                ...req.body,
                userId: req.userId
            });

            return res.status(200).json(syllabusDetails);
        } catch (error) {
            console.error(err.message);
			res.status(500).json({ msg: 'Server Error' }); 
        }
    },

    // POST    api/syllabus/update 
    async updateSyllabus(req, res) {
        try {
            let {batchId, syllabus, subjectName, syllabusId} = req.body;

            let syllabusDetails = await Syllabus.findById(syllabusId);
            if(!syllabusDetails) {
                return res.status(400).json({message: "Syllabus Not Found"});
            }

            syllabusDetails.subjectName = subjectName;

            let checkBatch = await Batches.findOne({_id: batchId});
            if(!checkBatch) {
                return res.status(400).json({message: "Batch Not Found"});
            }

            syllabusDetails.batchId = batchId;

            let incorrectFormat = false;
            syllabus.forEach(element => {
                if(!element.title || !element.sequenceNo) {
                    incorrectFormat = true;
                }

                if(element.subtopics[0]) {
                    element.subtopics.forEach(subEl => {
                        if(!subEl.subtopicTitle  || !subEl.sequenceNo) {
                            incorrectFormat = true;
                        }
                    })
                } 
            });

            if(incorrectFormat) {
                return res.status(400).json({message: "Syllabus Format is incorrect"});
            }

            syllabusDetails.syllabus = syllabus;

            await syllabusDetails.save();

            return res.status(200).json(syllabusDetails);
        } catch (error) {
            console.error(err.message);
			res.status(500).json({ msg: 'Server Error' }); 
        }
    },
}