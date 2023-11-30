const mongoose = require('mongoose');
const refType = mongoose.Schema.Types.ObjectId;

const HouseSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    residents: [
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
})

const House = mongoose.model("House", HouseSchema);
module.exports = House;