const mongoose = require('mongoose');
const refType = mongoose.Schema.Types.ObjectId;

const FacilityReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: refType,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open'
    },
    comments: [
        {
            type: refType,
            ref: 'Comment'
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const FacilityReport = mongoose.model("FacilityReport", FacilityReportSchema);
module.exports = FacilityReport;