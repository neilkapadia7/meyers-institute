const Users = require("@models/Users/User");
const Vouchers = require("@models/AdminControl/Vouchers");
const Students = require("@models/SchoolDetails/Students");
const Batches = require("@models/SchoolDetails/Batches");
const Attendance = require('@models/SchoolDetails/Attendance');
const LiveClasses = require('@models/SchoolDetails/LiveClasses');
const moment = require("moment");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;


module.exports = {
  // ----------------------------------------------------------------------------------------
  // Students

  // POST api/student/get
    async getAllStudents(req, res) {
      try {
        let { page, search, isCSV } = req.body;

        let query = {};

        if(!req.isAdminUser) {
          let user = await Users.findById(req.userId);

          if (!user) {
              return res.status(400).json({ message: 'Invalid User' });
          }

          query = {...query, userId: req.userId}; // return the students created by a single user
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
          .populate('currentBatch userId', 'name')
          .skip(25 * pageNo - 25)
          .limit(isCSV ? total : 25)
          .sort({createdAt:-1})
          .lean(); 

        res.status(200).json({data: students, message: "Success"});
      } 
      catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
      }
    },

    // POST api/student/getByBatch
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
            return res.status(400).json({ message: 'Invalid User' });
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
        res.status(500).json({ message: 'Server Error' });
      }
    },

    // POST api/student/add
    async addStudent(req, res) {
      try {
        const {name, email, currentBatch, userId} = req.body;

        let checkStd = await Students.findOne({email});
        if(checkStd) {
          return res.status(400).json({ message: 'Student Already Exists' });
        }

        let checkBatch = await Batches.findOne({_id: currentBatch});
        if(!checkBatch) {
          return res.status(400).json({ message: 'Batch does not exist' });
        }

        let student = await new Students({...req.body, userId: req.userId }).save();
        res.status(200).json({data: student, message: "Success"});

      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
      }
    },

    // POST api/student/updateStudent
    async updateStudent(req, res) {
      try {
        const {studentId, currentBatch, email, name, isActive} = req.body;

        let checkStd = await Students.findOne({_id: studentId});
        if(!checkStd) {
          return res.status(400).json({ message: 'Student Not Found' });
        }

        if(currentBatch) {
          let checkBatch = await Batches.findOne({_id: currentBatch});
          if(!checkBatch) {
            return res.status(400).json({ message: 'Batch does not exist' });
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
        res.status(500).json({ message: 'Server Error' });
      }
    },


  // ----------------------------------------------------------------------------------------
  // Batch

  // POST api/batch/get
  async getAllBatches(req, res) {
    try {
      let { page, search, isCSV } = req.body;

      let query = {};

      if(!req.isAdminUser) {
        let user = await Users.findById(req.userId);

        if (!user) {
            return res.status(400).json({ message: 'Invalid User' });
        }

        // query = {...query, userId: req.userId}; // return the vouchers created by a single user
        query = {...query, instituteId: ObjectId(user.instituteId)}; // Return All Batch By Institute
      }

      if(search) {
          query = {...query, name: { $regex: new RegExp(search, 'i') } };
      }

      let pageNo = 1;
      if (page) {
          pageNo = page;
      }

      let total = await Batches.countDocuments(query);
      let batches = await Batches.find(query)
        .skip(25 * pageNo - 25)
        .limit(isCSV ? total : 25)
        .sort({createdAt:-1})
        .lean(); 
      res.status(200).json({data: batches, total, message: "Success"});
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // Get api/batch/get/:batchId
  async getBatch(req, res) {
    try {
      let { batchId } = req.params;
      let batch = await Batches.findOne({_id: batchId});

      res.status(200).json({data: batch, message: "Success"});

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // POST api/batch/add
  async addBatch(req, res) {
    try {
      const {name, startDate, endDate, coursePrice} = req.body;

      let checkBatch = await Batches.findOne({name, userId: req.userId});
      if(checkBatch) {
        return res.status(400).json({ message: 'Batch Already Exists' });
      }

      if(startDate && endDate && moment(startDate) >= moment(endDate)) {
        return res.status(400).json({ message: 'Start Date cannot be greater than or equal to End Date' });
      }

      let batch = await new Batches({...req.body, userId: req.userId, instituteId: req.instituteId }).save();

      res.status(200).json({data: batch, message: "Success"});

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // POST api/batch/update
  async updateBatch(req, res) {
    try {
      const {batchId, name, isActive, startDate, endDate, coursePrice} = req.body;

      let checkBatch = await Batches.findOne({_id: batchId});
      if(!checkBatch) {
        return res.status(400).json({ message: 'Batch Not Found' });
      }

      if(moment(startDate) >= moment(endDate)) {
        return res.status(400).json({ message: 'Start Date cannot be greater than or equal to End Date' });
      }

      checkBatch.startDate = startDate;
      checkBatch.endDate = endDate;

      if(req.body.hasOwnProperty('isActive')) {
        checkBatch.isActive = isActive;
      }

      if(req.body.hasOwnProperty('coursePrice')) {
        checkBatch.coursePrice = coursePrice;
      }

      await checkBatch.save();
      res.status(200).json({data: checkBatch, message: "Success"});
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },


  // ----------------------------------------------------------------------------------------
  // Attendance

  // POST api/attendance/mark
  // Mark All Student Attendance by Class
  async markAttendanceByClass(req, res) {
    try {
      const {date, students, batchId, liveClassId} = req.body;
      let checkBatch = await Batches.findOne({_id: batchId});
      if(!checkBatch) {
        return res.status(400).json({ message: 'Batch Not Found' });
      }

      // Check Live Class
      let checkLiveClass = await LiveClasses.findOne({_id: liveClassId});
      if(!checkLiveClass) {
        return res.status(400).json({ message: 'Live Class Not Found' });
      }

      let attendance = await new Attendance({...req.body}).save();

      res.status(200).json(attendance);

    } catch (error) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },
  
  // POST api/attendance/get
  // Get Attendance by Class ID
  async getAttendanceByClass(req, res) {
    try {
      const {liveClassId} = req.body;
      let checkLiveClass = await LiveClasses.findOne({_id: liveClassId});
      if(!checkLiveClass) {
        return res.status(400).json({ message: 'Batch Not Found' });
      }

      let attendance = await Attendance.findOne({liveClassId});

      res.status(200).json(attendance);

    } catch (error) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },


  // POST 
  // Get all Live Classes by Batch
  // api/batch/getLiveClasses
  async getLiveClassesByBatch(req, res) {
    try {
      const {batchId} = req.body;
      let checkBatch = await Batches.findOne({_id: batchId});
      if(!checkBatch) {
        return res.status(400).json({ message: 'Batch Not Found' });
      }

      let liveClasses = await LiveClasses.find({batchId});

      res.status(200).json(liveClasses);
    } 
    catch (error) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  // POST
  // Get all Batches
  // async getAllBatch(req, res) {
  //   try {
  //     let query = {};
  //     if(!req.isAdminUser) {
  //       query = {...query, userId: req.userId};
  //     }
  //     let getBatch = await Batches.find(query);
      
  //     res.status(200).json(getBatch);
  //   } 
  //   catch (error) {
  //     console.error(err.message);
  //     res.status(500).json({ message: 'Server Error' });
  //   }
  // }
};