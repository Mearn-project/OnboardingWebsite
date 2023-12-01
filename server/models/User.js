const mongoose = require('mongoose');
const refType = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isHR: {
        type: Boolean,
        default: false
    },
    application: {
        type: refType,
        ref: 'Application'
    },
    visa: {
        type: refType,
        ref: 'Visa'
    },
    housing: {
        address: {
            type: String,
        },
        roommates: [
            {
                type: refType,
                ref: 'User'
            }
        ],
        facilityReports: [
            {
                type: refType,
                ref: 'FacilityReport'
            }
        ]
    }

})

const User = mongoose.model("User", UserSchema);
module.exports = User;