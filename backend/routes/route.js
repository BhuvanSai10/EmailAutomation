const router = require('express').Router();
const automateMail = require('../controller/appController.js');


router.post('/automateMail',automateMail);

module.exports = router;