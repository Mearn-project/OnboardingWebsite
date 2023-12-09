const FacilityReport = require('../models/FacilityReport');
const User = require('../models/User');
const House = require('../models/House');
const Comment = require('../models/Comment');
const { decodeToken } = require('../utils/generateToken');


const getHousingDetails = async (req, res) => {
    try {
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

        const house = await House.findById(user.housing).populate({
            path: 'residents',
            select: 'application',
            populate: {
                path: 'application',
                select: 'firstName lastName cellPhone'
            }
        })
        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }

        // filter roomates
        const filteredResidents = house.residents.filter((resident) => resident._id !== userId);
        const roommates = filteredResidents.map((resident) => ({
            name: resident.application.firstName + ' ' + resident.application.lastName,
            phone: resident.application.cellPhone
        }))

        const response = {
            address: house.address,
            roommates: roommates
        }

        res.status(201).json(response);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get housing details' });
    }
}

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

        house.facilityReports.push(facilityReport._id);
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
            .populate({ path: 'housing.facilityReports', model: 'FacilityReport' })
            .populate({ path: 'housing.facilityReports.comments', model: 'Comment' })
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

        const comment = new Comment({
            description,
            createdBy: userId
        });
        await comment.save();

        facilityReport.comments.push(comment._id);
        await facilityReport.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get comments in get userFacilityReports
// const getComments = async (req, res) => {
//     try {
//         const facilityReportId = req.params.facilityReportId;
//         const facilityReport = await FacilityReport.findById(facilityReportId).populate('comments');
//         if (!facilityReport) {
//             return res.status(404).json({ message: 'Facility report not found' });
//         }
//         res.json(facilityReport.comments);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

const updateComment = async (req, res) => {
    try {
        const { desctiption } = req.body;
        const facilityReportId = req.params.facilityReportId;
        const commentId = req.params.commentId;
        let userId;

        if (req.headers.cookie) {
            const cookie = req.headers.cookie;
            const token = cookie.slice(6);
            userId = decodeToken(token);
        }

        const facilityReport = await FacilityReport.findById(facilityReportId).populate('comments');

        if(!facilityReport) {
            return res.status(404).json({ message: 'Facility report not found' });
        }

        const comment = facilityReport.comments.find((comment) => comment._id === commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.description = desctiption;
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getHousingDetails, createFacilityReport, getUserFacilityReports, addComment, updateComment };