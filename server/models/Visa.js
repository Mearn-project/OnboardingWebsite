const mongoose = require('mongoose');
const refType = mongoose.Schema.Types.ObjectId;

const VisaSchema = new mongoose.Schema({
    user: {
        type: refType,
        ref: 'User',
        required: true
    },
    optReceipt: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        feedback: String,
    },
    optEAD: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        feedback: String,
    },
    i983: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        feedback: String,
        filledFormUrl: String,
        emptyTemplateUrl: {
            type: String,
            required: true
        },
        sampleTemplateUrl: {
            type: String,
            required: true
        }
    },
    i20: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        feedback: String,
    }
})

const Visa = mongoose.model("Visa", VisaSchema);
module.exports = Visa;