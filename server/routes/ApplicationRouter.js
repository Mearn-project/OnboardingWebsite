const express = require('express');
const path = require('path');
// const AWS = require('aws-sdk');
const multer = require('multer');

const { submitApplication, getApplicationDetails } = require('../controllers/ApplicationController');

const router = express.Router();

//check path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/')); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

// configure <form id="uploadForm" enctype="multipart/form-data">
router.post('/', upload.fields([
    { name: 'profilePictureUrl', maxCount: 1 },
    { name: 'optReceiptUrl', maxCount: 1 },
    { name: 'licenseCopyUrl', maxCount: 1}
  ]), submitApplication);
// router.post('/', submitApplication);

router.get('/:applicationId', getApplicationDetails);

module.exports = router;
