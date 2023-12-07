const express = require('express');

const { createFacilityReport, getUserFacilityReports, addComment, getComments, getHousingDetails, updateComment } = require('../controllers/HousingController');

const router = express.Router();

router.get('/', getHousingDetails)

router.post('/facility-reports', createFacilityReport);

router.get('/users/:userId/facility-reports', getUserFacilityReports);

router.post('/facility-reports/:facilityReportId/comments', addComment)

router.get('/facility-reports/:facilityReportId/comments', getComments)

// shoud have one route for update comment
router.patch('/facility-reports/:facilityReportId/comments/:commentId', updateComment);

module.exports = router;