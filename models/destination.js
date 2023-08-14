const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    date : {
        type: Date,
    }, 
    hotels : {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    food : {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    summary: {
        type: String,
    }
}, {
timestamps: true,
})

const destinationSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    favoriteSpots: {
        type: String,
    },
    budget: {
        type: Number,
        min: 1000,
        max: 1000000,
    },
    reviews: [reviewSchema],
}, {
    timestamps: true,
} );

 module.exports = mongoose.model('Destination', destinationSchema);