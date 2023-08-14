var express = require('express');
var router = express.Router();
const destinationsCtrl = require('../controllers/destinations')
/* GET users listing. */

router.get('/', destinationsCtrl.index)

router.get('/new', destinationsCtrl.newDestination)

module.exports = router;
