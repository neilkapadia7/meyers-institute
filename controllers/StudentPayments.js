const Users = require("@models/Users/User");
const Vouchers = require("@models/AdminControl/Vouchers");
const Students = require("@models/SchoolDetails/Students");
const Batches = require("@models/SchoolDetails/Batches");
const StudentPayments = require("@models/SchoolDetails/StudentPayments");
const Attendance = require('@models/SchoolDetails/Attendance');
const LiveClasses = require('@models/SchoolDetails/LiveClasses');
const moment = require("moment");


module.exports = {
  // ----------------------------------------------------------------------------------------
  // Students

  // POST /student/payment/get/:studentId
    async getPaymentByStudent(req, res) {
      try {
        let {batchId, studentId} = req.params;
        let studentPayment = await StudentPayments.findOne({studentId, batchId});
        if(!studentPayment) {
            res.status(404).json({message: "User not found"});
        } 

        res.status(200).json(studentPayment);
      } 
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
      }
    },


    // POST /student/payment/add
    async addPayment(req, res) {
      try {
        const {isMarkedPaid, studentId, batchId, totalPaidAmount, discountedAmount, userId} = req.body;

        let checkStd = await Students.findOne({_id: studentId});
        if(checkStd) {
          return res.status(400).json({ msg: 'Student Not Found' });
        }

        let checkBatch = await Batches.findOne({_id: batchId});
        if(!checkBatch) {
          return res.status(400).json({ msg: 'Batch does not exist' });
        }

        let totalPendingAmount = checkBatch.coursePrice - (totalPaidAmount + discountedAmount);

        let isPaymentComplete = false;
        if(totalPendingAmount === 0) {
            isPaymentComplete = true;
        }

        let payment = await new StudentPayments({...req.body, userId: req.isAdminUser && userId || req.userId, totalPendingAmount, isPaymentComplete });
        res.status(200).json(payment);

      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
      }
    },

    // POST /student/payment/update
    async updateStudentPayment(req, res) {
      try {
        const {paymentId,isMarkedPaid, studentId, batchId, totalPaidAmount, discountedAmount, userId} = req.body;

        let checkStd = await Students.findOne({_id: studentId});
        if(!checkStd) {
          return res.status(400).json({ msg: 'Student Not Found' });
        }

        if(batchId) {
          let checkBatch = await Batches.findOne({_id: batchId});
          if(!checkBatch) {
            return res.status(400).json({ msg: 'Batch does not exist' });
          }
        }

        let totalPendingAmount = checkBatch.coursePrice - (totalPaidAmount + discountedAmount);

        let isPaymentComplete = false;
        if(totalPendingAmount === 0) {
            isPaymentComplete = true;
        }

        let paymentHistory = {
          amount: totalPaidAmount - getPayment.totalPaidAmount, 
          paidOn: new Date()
        };

        if(getPayment.paymentHistory[0]) {
          getPayment.paymentHistory.push(paymentHistory);
        } else {
          getPayment.paymentHistory = [
            paymentHistory
          ]
        }
        
        let getPayment = await StudentPayments.findById(paymentId);
        getPayment.isPaymentComplete = isPaymentComplete;
        getPayment.totalPaidAmount = totalPaidAmount;
        getPayment.discountedAmount = discountedAmount;

        if (req.body.hasOwnProperty("isMarkedPaid")) {
            getPayment.isMarkedPaid = isMarkedPaid;
        }
        if (req.body.hasOwnProperty("batchId")) {
            getPayment.batchId = batchId;
        }
        await getPayment.save()

        return res.status(200).json(getPayment);
      } 
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
      }
    },
}