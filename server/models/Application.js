const mongoose = require('mongoose');
const refType = mongoose.Schema.Types.ObjectId;

const ApplicationSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Not Started', 'Pending', 'Rejected', 'Approved'],
        default: 'Not Started'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: String,
    preferedName: String,
    profilePictureUrl: String,
    currentAddress: {
        buildingApt: {
            type: String,
            required: true
        },
        streetName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        }
    },
    cellPhone: {
        type: String,
        required: true
    },
    workPhone: String,
    carInformation: {
        make: String,
        model: String,
        color: String
    },
    email: {
        type: String,
        required: true
    },
    ssn: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'I do not wish to answer']
    },
    isUSCitizen: {
        type: Boolean,
        required: true
    },
    workAuthorization: {
        type: String,
        enum: ['Green Card', 'Citizen', 'H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'],
        required: true
    },
    workAuthorizationUrl: String,
    optReceiptUrl: String,
    visaTitle: String,
    startDate: Date,
    endDate: Date,
    hasDriverLicense: {
        type: Boolean,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true
    },
    licenseExpirationDate: {
        type: Date,
        required: true
    },
    licenseCopyUrl: {
        type: String,
        required: true
    },
    reference: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        middleName: String,
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        relationship: {
            type: String,
            required: true
        }
    },
    emergencyContacts: [
        {
            type: refType,
            ref: 'EmergencyContact'
        }
    ]
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;