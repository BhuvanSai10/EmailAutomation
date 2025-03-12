const express = require('express');
const router = express.Router();

const automateMail = require('../controller/sendNowController.js'); 
const { scheduleEmail } = require('../controller/scheduleController');

const authController = require('../controller/authController');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.post('/automateMail', automateMail);
router.post('/schedule', scheduleEmail);

module.exports = router;