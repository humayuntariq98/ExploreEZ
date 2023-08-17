const Destination = require("../models/destination");
const handleError = require("../util");

module.exports = {
    create,
    removeReview,
    renderEditForm,
    updateReview,
};

//find the destination, add user info to req.body, push req.body to the reviews array
async function create(req, res) {
    try {
        req.body.postDate = new Date().toDateString();
        const reviewDestination = await Destination.findById(
            req.params.destinationId
        );

        // Add the user-centric info to req.body (the new review)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        reviewDestination.reviews.push(req.body);
        console.log("reviews array: ", reviewDestination.reviews);
        await reviewDestination.save();
        res.redirect(`/destinations/${reviewDestination._id}`);
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

// finding the destination, find the index of the review that was edited, remove it from the array, save the destination
async function removeReview(req, res) {
    try {
        const { destinationId, reviewId } = req.params;
        // Find the destination
        const destinationFound = await Destination.findOne({
            "reviews._id": reviewId,
            "reviews.user": req.user._id,
        });
      
        // Find the index of the review within the reviews array
        const reviewIndex = destinationFound.reviews.findIndex(
            (review) => review._id.toString() === reviewId
        );

        // // Remove the review from the reviews array
        destinationFound.reviews.splice(reviewIndex, 1);

        // // Save the updated destination
        await destinationFound.save();
        res.redirect(`/destinations/${destinationId}`);
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

//find the destination, find the review, render the review edit page
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

//find the destination, find the index of review, use req.body to update review properties, save the destination
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
