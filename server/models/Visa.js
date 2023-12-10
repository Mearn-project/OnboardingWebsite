const mongoose = require('mongoose');
const refType = mongoose.Schema.Types.ObjectId;

const VisaSchema = new mongoose.Schema({
    optReceipt: {
        status: {
            type: String,
            enum: ['Uploading', 'Pending', 'Approved', 'Rejected'],
            default: 'Uploading'
        },
        feedback: String,
        url: String,
        previewUrl: String
    },
    optEAD: {
        status: {
            type: String,
            enum: ['Uploading', 'Pending', 'Approved', 'Rejected'],
            default: 'Uploading'
        },
        feedback: String,
        url: String,
        previewUrl: String
    },
    i983: {
        status: {
            type: String,
            enum: ['Uploading', 'Pending', 'Approved', 'Rejected'],
            default: 'Uploading'
        },
        feedback: String,
        url: String,
        previewUrl: String,
        // should have two template for downloading
        emptyTemplateUrl: {
            type: String,
            default: "https://my-onboarding-project.s3.us-east-2.amazonaws.com/i983.pdf"
        },
        sampleTemplateUrl: {
            type: String,
            default: "https://my-onboarding-project.s3.us-east-2.amazonaws.com/i983_sample.pdf"
        }
    },
    i20: {
        status: {
            type: String,
            enum: ['Uploading', 'Pending', 'Approved', 'Rejected'],
            default: 'Uploading'
        },
        feedback: String,
        url: String,
        previewUrl: String,
    }
})

const Visa = mongoose.model("Visa", VisaSchema);
module.exports = Visa;