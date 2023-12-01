const express = require('express');

const { getVisaInfo, updateVisaInfo } = require('../controllers/VisaController');

const router = express.Router();

router.get('/:userId', getVisaInfo);

router.put('/:userId', updateVisaInfo);

module.exports = router;