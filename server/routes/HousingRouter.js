const express = require('express');

const { createFacilityReport, getUserFacilityReports, addComment, getComments } = require('../controllers/HousingController');

const router = express.Router();

router.post('/facility-reports', createFacilityReport);

router.get('/users/:userId/facility-reports', getUserFacilityReports);

router.post('/facility-reports/:facilityReportId/comments', addComment)

router.get('/facility-reports/:facilityReportId/comments', getComments)

// shoud have one route for update comment


module.exports = router;