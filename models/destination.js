const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    postDate : {
        type: Date,
        default: Date.now
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: String,
      userAvatar: String
    }, {
      timestamps: true
    });

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
    image: {type: String},
    reviews: [reviewSchema],
}, {
    timestamps: true,
} );

 module.exports = mongoose.model('Destination', destinationSchema);