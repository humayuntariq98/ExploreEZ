const Destination = require("../models/destination");

const axios = require("axios");

const handleError = require("../util");

module.exports = {
    index,
    newDestination,
    create,
    show,
    edit,
    update,
    removeDestination,
};


//render all destinations
async function index(req, res) {
    try {
        const allDestinations = await Destination.find({});
        res.render("destinations/index", {
            title: "All Destinations",
            allDestinations,
        });
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

//rendering new destination page with the form for new destination
async function newDestination(req, res) {
    try {
        res.render("destinations/new", {
            title: "Add a new destination",
        });
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

//create a destination and load its image from google API
async function create(req, res) {
    const destinationData = { ...req.body };
    try {
        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/place/textsearch/json",
            {
                params: {
                    query: req.body.name,
                    key: process.env.GOOGLE_PLACES_API_KEY,
                },
            }
        );
        console.log("create response:", response);

        if (
            response.data.results &&
      response.data.results[0] &&
      response.data.results[0].photos
        ) {
            const photoReference = response.data.results[0].photos[0].photo_reference;
            const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

            destinationData.image = imageUrl;
        }

        await Destination.create(destinationData);
        res.redirect("/destinations");
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

//finding the destination that was clicked and rendering the show page
async function show(req, res) {
    try {
        const foundDestination = await Destination.findById(req.params.id);
        res.render("destinations/show", {
            title: foundDestination.name,
            foundDestination,
        });
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

//finding a destination and rendering the edit page for destinations
async function edit(req, res) {
    try {
        const editedDestination = await Destination.findById(req.params.id);
        res.render("destinations/edit", {
            title: editedDestination.name,
            editedDestination,
        });
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

//updating the edited destination in the database
async function update(req, res) {
    try {
        const destinationData = { ...req.body };
        const editedDestination = await Destination.findById(req.params.id);
        editedDestination.name = destinationData.name;
        editedDestination.favoriteSpots = destinationData.favoriteSpots;
        editedDestination.budget = destinationData.budget;

        // Fetch updated image from Google Places API
        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/place/textsearch/json",
            {
                params: {
                    query: editedDestination.name,
                    key: process.env.GOOGLE_PLACES_API_KEY,
                },
            }
        );
        // Store api key inside env as google places API
        if (
            response.data.results &&
      response.data.results[0] &&
      response.data.results[0].photos
        ) {
            const photoReference = response.data.results[0].photos[0].photo_reference;
            const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
            editedDestination.image = imageUrl;
        }

        await editedDestination.save();
        res.redirect("/destinations");
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

//deleting a destination
async function removeDestination(req, res) {
    try {
        await Destination.deleteOne({ _id: req.params.id });
        res.redirect("/destinations");
    } catch (error) {
        handleError(error, "something went wrong", res);
    }
}
