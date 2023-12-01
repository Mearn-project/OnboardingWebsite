const express = require('express');

const { getUserInfo, updateUserInfo } = require('../controllers/UserInfoController');

const router = express.Router();

router.get('/:userId', getUserInfo);

router.put('/:userId', updateUserInfo);

module.exports = router;