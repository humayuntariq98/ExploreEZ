var express = require('express');
var router = express.Router();
const reviewsCtrl = require('../controllers/reviews')

router.post('/destinations/:id/reviews', reviewsCtrl.create)
router.delete('destinations/:id/reviews/:reviewid', reviewsCtrl.removeReview)
router.get('reviews/:id/edit', reviewsCtrl.editReview)



module.exports = router;