const mongoose = require('mongoose');

// Incomplete
const StudentPayments = mongoose.Schema({
    isPaymentComplete: {type: Boolean, default: false},
    isMarkedPaid: {type: Boolean, default: false},
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batches",
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }, // Added for which login 
    totalPaidAmount: {type: Number, default: 0},
    totalPendingAmount: {type: Number},
    discountedAmount: {type: Number, default: 0},
    paymentHistory: [{
        amount: {type: Number},
        paidOn: {type: Date},
    }],
}, 
{
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
);

module.exports = mongoose.model('StudentPayments', StudentPayments);
