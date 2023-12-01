const express = require('express');
// const path = require('path');
// const AWS = require('aws-sdk');

const { submitApplication, getApplicationDetails } = require('../controllers/ApplicationController');

const router = express.Router();


router.post('/', submitApplication);

router.get('/:applicationId', getApplicationDetails);

module.exports = router;
