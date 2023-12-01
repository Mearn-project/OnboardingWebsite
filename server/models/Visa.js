const mongoose = require('mongoose');
const refType = mongoose.Schema.Types.ObjectId;

const VisaSchema = new mongoose.Schema({
    optReceipt: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        feedback: String,
        url: String
    },
    optEAD: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        feedback: String,
        url: String
    },
    i983: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        feedback: String,
        filledFormUrl: String,
        // should have two template for downloading
        emptyTemplateUrl: {
            type: String,
            // required: true
        },
        sampleTemplateUrl: {
            type: String,
            // required: true
        }
    },
    i20: {
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        feedback: String,
        url: String
    }
})

const Visa = mongoose.model("Visa", VisaSchema);
module.exports = Visa;