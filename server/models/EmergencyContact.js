const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    middleName: String,
    phone: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    relationship: {
        type: String,
        // required: true
    }
})

const EmergencyContact = mongoose.model("EmergencyContact", EmergencyContactSchema);
module.exports = EmergencyContact;