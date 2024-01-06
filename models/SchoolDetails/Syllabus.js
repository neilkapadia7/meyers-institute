const mongoose = require('mongoose');

// Incomplete
const Syllabus = mongoose.Schema({
	subjectName: {
		type: String,
		required: true,
	},
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batches",
    },
    syllabus: [
        {
            sequenceNo: {type: Number},
            title: {type: String},
            subtopics: [
                {
                    subtopicTitle: {type: String},
                    sequenceNo: {type: Number},
                }
            ],
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }, // Added for which login 
    isActive: {type: Boolean, default: true},
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

module.exports = mongoose.model('Syllabus', Syllabus);
