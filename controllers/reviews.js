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
    // console.log("my name is humayun")
    try {
        const destinationToAccess = await Destination.findById(req.params.id)
        // review to delete should have the mongo id made available from the show pag. you can pass it as req.params or you can pass it through the form as req.body
        console.log("Review Index", destinationToAccess)
        const reviewIndexToDelete = destinationToAccess.reviews.findIndex(req.params.reviewid)
        console.log("Review Index", reviewIndexToDelete)
        destinationToAccess.reviews.splice(reviewIndexToDelete,0)
        await destinationToAccess.save()
        res.redirect (`/destinations/${req.params.id}`)
      } catch (error) {
        console.log(error)
      }
    }