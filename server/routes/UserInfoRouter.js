const express = require('express');

const { getUserInfo, updateUserInfo, updateFiles } = require('../controllers/UserInfoController');

const router = express.Router();

router.get('/', getUserInfo);

router.put('/', updateUserInfo);

router.put('/files', updateFiles);

module.exports = router;