const Users = require("@models/User");
const Vouchers = require("@models/Vouchers/Vouchers");
const Students = require("@models/SchoolDetails/Students");


module.exports = {
    // POST api/student/get
    async getAllStudents(req, res) {
        try {
            
        } catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
    },

    // GET api/student/getByBatch/:voucherId
    async getStudentByBatch(req, res) {
        try {
            
        } catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
    },

    // POST api/student/add
    async addStudent(req, res) {
        try {
            
        } catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
    },

    // POST api/student/updateStudent
    async updateStudent(req, res) {
        try {
            const {studentId} = req.body;
            
        } catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
    },
};