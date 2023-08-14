const Destination = require('../models/destination')
module.exports = {
    create,
}

async function create(req, res) {
    try {
       const reviewData = {...req.body} 
       reviewData.time = new Date()
       const reviewDestination = await Destination.findById(req.params.id)
       reviewDestination.reviews.push(reviewData)
       await reviewDestination.save()
       res.redirect(`/destinations/${reviewDestination._id}`)
    } catch (error) {

    //  handleError(res, 'something went wrong', error)  
    console.log(error)
    }
}