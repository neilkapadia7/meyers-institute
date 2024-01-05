const Users = require("@models/User");
const Vouchers = require("@models/Vouchers/Vouchers");
const Students = require("@models/SchoolDetails/Students");
const Batches = require("@models/SchoolDetails/Batches");


module.exports = {
    // POST api/student/get
    async getAllStudents(req, res) {
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

        let total = await Students.countDocuments(query);
        let students = await Students.find(query)
          .skip(25 * pageNo - 25)
          .limit(isCSV ? total : 25)
          .sort({createdAt:-1})
          .lean(); 

        res.status(200).json(students);
      } 
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
      }
    },

    // POST api/student/getByBatch/:voucherId
    async getStudentByBatch(req, res) {
      try {
        let { page, search, isCSV, batchId } = req.body;

        let query = {};

        if(batchId) {
          query= {...query, currentBatch: batchId};
        }

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

        let total = await Students.countDocuments(query);
        let students = await Students.find(query)
          .skip(25 * pageNo - 25)
          .limit(isCSV ? total : 25)
          .sort({createdAt:-1})
          .lean(); 

        res.status(200).json(students);

      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
      }
    },

    // POST api/student/add
    async addStudent(req, res) {
      try {
        const {name, email, currentBatch, userId} = req.body;

        let checkStd = await Students.findOne({email});
        if(checkStd) {
          return res.status(400).json({ msg: 'Student Already Exists' });
        }

        let checkBatch = await Batches.findOne({_id: currentBatch});
        if(!checkBatch) {
          return res.status(400).json({ msg: 'Batch does not exist' });
        }

        let student = await new Students({...req.body, userId: req.isAdminUser && userId || req.userId });
        res.status(200).json(student);

      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
      }
    },

    // POST api/student/updateStudent
    async updateStudent(req, res) {
      try {
        const {studentId, currentBatch, email, name, isActive} = req.body;

        let checkStd = await Students.findOne({_id: studentId});
        if(!checkStd) {
          return res.status(400).json({ msg: 'Student Not Found' });
        }

        if(currentBatch) {
          let checkBatch = await Batches.findOne({_id: currentBatch});
          if(!checkBatch) {
            return res.status(400).json({ msg: 'Batch does not exist' });
          }
          checkStd.currentBatch = currentBatch;
        }

        if(req.body.hasOwnProperty('isActive')) {
          checkStd.isActive = isActive;
        }

        await checkStd.save();
        res.status(200).json(checkStd);
      } 
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
      }
    },
};