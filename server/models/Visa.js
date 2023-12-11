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
            default: "https://s3.console.aws.amazon.com/s3/object/revsawsbucket?region=us-east-1&prefix=HR+Project.pdf"
        },
        sampleTemplateUrl: {
            type: String,
            default: "https://s3.console.aws.amazon.com/s3/object/revsawsbucket?region=us-east-1&prefix=HR+Project.pdf"
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