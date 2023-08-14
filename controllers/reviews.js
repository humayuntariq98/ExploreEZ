const destination = require('../models/destination')
const Destination = require('../models/destination')

module.exports = {
    create,
    removeReview,
}

async function create(req, res) {
    try {
       const reviewData = {...req.body} 
       reviewData.postDate = new Date().toDateString()
       const reviewDestination = await Destination.findById(req.params.id)
       reviewDestination.reviews.push(reviewData)
       console.log('reviews array: ',reviewDestination.reviews)
       await reviewDestination.save()
       res.redirect(`/destinations/${reviewDestination._id}`)
    } catch (error) {

    //  handleError(res, 'something went wrong', error)  
    console.log(error)
    }
}

async function removeReview (req,res) {
    try {
        const destinationToAccess = await Destination.findById(req.params.id)
        const reviewToDelete = await destinationToAccess.reviews.findIndex()
        await destinationToAccess.reviews.slice(0,0)
        console.log("remove Review", Destination.reviews.findById(req.params.id ))
        res.redirect (`/destinations/${req.params.id}`)
      } catch (error) {
        console.log(error)
      }
    }