require("dotenv").config();

require("./database");


const Destination = require("../models/destination");

async function createDestination(data){
    try {
        const newDestination = await Destination.create(data);
        console.log(newDestination);
    } catch (error) {
        console.log(error);
    }
}

const testData = {
    name: "Shanghai",
    favoriteSpots: "downtown",
    budget: 34000,
};

createDestination(testData);