var express = require("express");
var router = express.Router({mergeParams:true});
const reviewsCtrl = require("../controllers/reviews");

router.post("/", reviewsCtrl.create);

router.delete("/:reviewId", reviewsCtrl.removeReview);

router.get("/:reviewId/edit", reviewsCtrl.renderEditForm);

router.put("/:reviewId",reviewsCtrl.updateReview);

module.exports = router;