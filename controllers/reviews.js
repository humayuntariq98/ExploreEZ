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
        const reviewToDelete = req.query.reviewid
        if (!reviewIdToDelete) {
          return res.status(400).send("Review ID not provided");
        }
        // review to delete should have the mongo id made available from the show pag. you can pass it as req.params or you can pass it through the form as req.body
        const reviewIndex = Destination.reviews.findIndex((review) => {
          review._id.toString() === reviewIdToDelete
          
        })
      destinationToAccess.reviews.pull(req.params.reviewid)
        await destinationToAccess.save()
        res.redirect (`/destinations/${req.params.id}`)
      } catch (error) {
        console.log(error)
      }
    }