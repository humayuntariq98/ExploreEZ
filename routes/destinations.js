var express = require('express');
var router = express.Router();
const Destination = require('../models/destination');
const destinationsCtrl = require('../controllers/destinations')
/* GET users listing. */


router.get('/', destinationsCtrl.index)

router.get('/new', destinationsCtrl.newDestination)

router.post('/', destinationsCtrl.create)

router.get('/:id', destinationsCtrl.show)

router.get('/:id/edit', destinationsCtrl.edit)

router.delete('/:id',destinationsCtrl.removeDestination)

router.put('/:id', destinationsCtrl.update)
module.exports = router;
