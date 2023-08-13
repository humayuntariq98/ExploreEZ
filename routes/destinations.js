var express = require('express');
var router = express.Router();
const destinationsCtrl = require('../controllers/destinations')
/* GET users listing. */
router.get('/', destinationsCtrl.index)

module.exports = router;
