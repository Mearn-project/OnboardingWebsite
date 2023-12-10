const express = require('express');

const { createFacilityReport, getUserFacilityReports, addComment, getHousingDetails, updateComment } = require('../controllers/HousingController');

const router = express.Router();

router.get('/', getHousingDetails)

router.post('/facility-reports', createFacilityReport);

router.get('/users/facility-reports', getUserFacilityReports);

router.post('/facility-reports/:facilityReportId/comments', addComment)

// router.get('/facility-reports/:facilityReportId/comments', getComments)

// shoud have one route for update comment
router.patch('/facility-reports/:facilityReportId/comments/:commentId', updateComment);

module.exports = router;