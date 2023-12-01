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
    applicationStatus: {
        type: String,
        enum: ['Not Started', 'Pending', 'Rejected', 'Approved'],
        default: 'Not Started'
    },
    visa: {
        type: refType,
        ref: 'Visa'
    },
    housing: {
        type: refType,
        ref: 'House'
    }

})

const User = mongoose.model("User", UserSchema);
module.exports = User;