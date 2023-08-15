var express = require('express');
var router = express.Router();
const reviewsCtrl = require('../controllers/reviews')

router.post('/destinations/:id/reviews', reviewsCtrl.create)

router.delete('/destinations/:destinationId/reviews/:reviewId', reviewsCtrl.removeReview);
router.get('/destinations/:destinationId/reviews/:reviewId/edit', reviewsCtrl.renderEditForm);




module.exports = router;