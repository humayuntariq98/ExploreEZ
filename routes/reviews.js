var express = require('express');
var router = express.Router();
const reviewsCtrl = require('../controllers/reviews')

router.post('/destinations/:id/reviews', reviewsCtrl.create)
router.delete('/destinations/:destinationId/reviews/:reviewId', reviewsCtrl.removeReview);




module.exports = router;