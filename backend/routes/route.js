const express = require('express');
const router = express.Router();

const automateMail = require('../controller/sendNowController.js'); 
const { scheduleEmail } = require('../controller/scheduleController');


router.post('/automateMail', automateMail);
router.post('/schedule', scheduleEmail);

module.exports = router;