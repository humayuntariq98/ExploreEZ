const Destination = require('../models/destination')

module.exports = {
    index,
    newDestination,
    create,
    show, 
}

async function index(req, res){
    try {
      const allDestinations = await Destination.find({})
      res.render('destinations/index', {
        title: 'All Destinations',
        allDestinations
      })  
    } catch (error) {
      handleError(res, 'something went wrong', error)  
    }
}

async function newDestination (req,res) {
  try {
    res.render ('destinations/new' , {
      title : "Add a new destination"
    })
  } catch (error) {
    handleError(res, 'something went wrong', error)  
  }
}

async function create (req,res){
  const destinationData = {...req.body}
  try {
    const newDestination = await Destination.create(destinationData)
    // console.log("creatingDestination", newDestination)
    res.redirect('/destinations')
  } catch (error) {
    handleError(res, 'something went wrong', error)  
  }
}

async function show (req, res) {
  try {
    const foundDestination = await Destination.findById(req.params.id)
    res.render('destinations/show', {
      title: foundDestination.name,
      foundDestination
    })
  } catch (error) {
    handleError(res, 'something went wrong', error)  
  }
}