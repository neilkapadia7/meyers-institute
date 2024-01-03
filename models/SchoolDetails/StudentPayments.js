const mongoose = require('mongoose');

// Incomplete
const StudentPayments = mongoose.Schema({
    isPaid: {type: Boolean, default: false},
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
