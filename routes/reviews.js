var express = require('express');
var router = express.Router();
const reviewsCtrl = require('../controllers/reviews')

router.post('/destinations/:id/reviews', reviewsCtrl.create)
router.delete('/destinations/:id', reviewsCtrl.removeReview)



module.exports = router;