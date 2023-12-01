const express = require('express');
const path = require('path');

const { downloadDocument, previewDocument } = require('../controllers/DocumentController');

const router = express.Router();

router.get('/:filename', downloadDocument);

router.get('/preview/:filename', previewDocument);

module.exports = router;