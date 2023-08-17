// const destination = require('../models/destination')
const Destination = require("../models/destination");
const handleError = require("../util");

module.exports = {
    create,
    removeReview,
    renderEditForm,
    updateReview,
};

async function create(req, res) {
    try {
    //  const reviewData = {...req.body}
        req.body.postDate = new Date().toDateString();
        const reviewDestination = await Destination.findById(
            req.params.destinationId
        );

        // Add the user-centric info to req.body (the new review)
        console.log("userrr", req.user);
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        console.log(reviewDestination, "checking");
        reviewDestination.reviews.push(req.body);
        console.log("reviews array: ", reviewDestination.reviews);
        await reviewDestination.save();
        res.redirect(`/destinations/${reviewDestination._id}`);
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

async function removeReview(req, res) {
    try {
        const { destinationId, reviewId } = req.params;
        // Find the destination by its ID
        // const destination = await Destination.findById(destinationId);
        const destinationFound = await Destination.findOne({
            "reviews._id": reviewId,
            "reviews.user": req.user._id,
        });
        console.log("destination to be found", destinationFound);
        // Find the index of the review within the reviews array
        const reviewIndex = destinationFound.reviews.findIndex(
            (review) => review._id.toString() === reviewId
        );

        // // Remove the review from the reviews array
        destinationFound.reviews.splice(reviewIndex, 1);

        // // Save the updated destination
        await destinationFound.save();

        // console.log("Removed review from Destination", destination);
        res.redirect(`/destinations/${destinationId}`);
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

async function renderEditForm(req, res) {
    try {
        const { destinationId, reviewId } = req.params;

        const destination = await Destination.findById(destinationId);

        const review = destination.reviews.find(
            (review) => review._id.toString() === reviewId
        );

        res.render("reviews/edit", { destination, review, title: "Edit Review" });
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

async function updateReview(req, res) {
    try {
        const { destinationId, reviewId } = req.params;

        const destination = await Destination.findById(destinationId);

        if (!destination) {
            res.status(404).send("Destination not found");
            return;
        }

        const reviewIndex = destination.reviews.findIndex(
            (review) => review._id.toString() === reviewId
        );
        const reviewData = { ...req.body };
        destination.reviews[reviewIndex].hotels = reviewData.hotels;
        destination.reviews[reviewIndex].food = reviewData.food;
        destination.reviews[reviewIndex].summary = reviewData.summary;
        await destination.save();
        res.redirect(`/destinations/${destinationId}`);
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}
