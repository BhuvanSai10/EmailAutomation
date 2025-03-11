const express = require('express');
const router = express.Router();

const automateMail = require('../controller/appController.js'); 

router.post('/automateMail', automateMail);

module.exports = router;