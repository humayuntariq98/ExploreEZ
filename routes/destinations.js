var express = require("express");
var router = express.Router();
const destinationsCtrl = require("../controllers/destinations");
const reviewsRouter = require("./reviews");
/* GET users listing. */

router.get("/", destinationsCtrl.index);

router.get("/new", destinationsCtrl.newDestination);

router.post("/", destinationsCtrl.create);

router.get("/:id", destinationsCtrl.show);

router.get("/:id/edit", destinationsCtrl.edit);

router.delete("/:id", destinationsCtrl.removeDestination);

router.put("/:id", destinationsCtrl.update);

//storing the reviews router inside of the destinatons router
router.use("/:destinationId/reviews", reviewsRouter);

module.exports = router;
