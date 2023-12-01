const FacilityReport = require('../models/FacilityReport');
const User = require('../models/User');
const { decodeToken } = require('../utils/generateToken');

// create a facility report
const createFacilityReport = async (req, res) => {
    try {
        const { title, description } = req.body;
        let userId;

        if (req.headers.cookie) {
            const cookie = req.headers.cookie;
            const token = cookie.slice(6);
            userId = decodeToken(token);
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const facilityReport = new FacilityReport({
            title,
            description,
            createdBy: userId
        });
        await facilityReport.save();

        const house = await House.findById(user.housing)
        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }

        housing.facilityReports.push(facilityReport._id);
        await user.save();

        res.status(201).json(facilityReport);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create facility report' });
    }
}

// get facility reports for a user
const getUserFacilityReports = async (req, res) => {
    try {
        let userId;
        if (req.headers.cookie) {
            const cookie = req.headers.cookie;
            const token = cookie.slice(6);
            userId = decodeToken(token);
        }
        const user = await User.findById(userId)
            .populate('housing')
            .populate({ path: 'housing.facilityReports', model: 'FacilityReport' });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.housing.facilityReports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal servel error' });
    }
}

const addComment = async (req, res) => {
    try {
        const { description } = req.body;
        const facilityReportId = req.params.facilityReportId;
        let userId;

        if (req.headers.cookie) {
            const cookie = req.headers.cookie;
            const token = cookie.slice(6);
            userId = decodeToken(token);
        }

        const facilityReport = await FacilityReport.findById(facilityReportId);

        if (!facilityReport) {
            return res.status(404).json({ message: 'User not found' });
        }

        const comment = {
            description,
            createdBy: userId
        }
        facilityReport.comments.push(comment);
        await facilityReport.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getComments = async (req, res) => {
    try {
        const facilityReportId = req.params.facilityReportId;
        const facilityReport = await FacilityReport.findById(facilityReportId);
        if (!facilityReport) {
            return res.status(404).json({ message: 'Facility report not found' });
        }
        res.json(facilityReport.comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { createFacilityReport, getUserFacilityReports, addComment, getComments };