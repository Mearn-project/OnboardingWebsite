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
      cb(null, uuidv4() + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

// configure <form id="uploadForm" enctype="multipart/form-data">
router.post('/', upload.fields([{ name: 'files' }]), submitApplication);

router.get('/:applicationId', getApplicationDetails);

module.exports = router;
