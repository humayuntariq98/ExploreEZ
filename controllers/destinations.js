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

async function newDestination(req, res) {
    try {
        res.render("destinations/new", {
            title: "Add a new destination",
        });
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

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
            // console.log('imageURL:', imageUrl)
            // console.log('photoReference:', photoReference)
        }

        await Destination.create(destinationData);
        res.redirect("/destinations");
    } catch (error) {
        handleError(res, "something went wrong", error);
    }
}

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
        //  TODO Store api key inside env as google places API
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

async function removeDestination(req, res) {
    try {
        await Destination.deleteOne({ _id: req.params.id });
        res.redirect("/destinations");
    } catch (error) {
        handleError(error, "something went wrong", res);
    }
}
