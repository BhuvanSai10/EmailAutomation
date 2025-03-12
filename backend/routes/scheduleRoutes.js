const express = require('express');
const router = express.Router();
const { scheduleEmail } = require('../controller/scheduleController');

router.post('/schedule', scheduleEmail);

module.exports = router;