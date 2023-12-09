const express = require('express');
const multer = require('multer');

const { getVisaInfo, updateVisaInfo } = require('../controllers/VisaController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/')); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

router.get('/', getVisaInfo);

router.put('/', upload.fields([
    { name: 'optReceipt', maxCount: 1 },
    { name: 'optEAD', maxCount: 1 },
    { name: 'i983', maxCount: 1},
    { name: 'i20', maxCount: 1},
  ]), updateVisaInfo);

module.exports = router;