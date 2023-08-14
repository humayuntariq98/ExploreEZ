const Destination = require('../models/destination')

module.exports = {
    index,
    newDestination,
    create,
    show, 
    edit,
    update,
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
    console.log(error)  
  }
}

async function edit (req, res) {
  try {
    const editedDestination = await Destination.findById(req.params.id)
    res.render('destinations/edit', {
      title: editedDestination.name,
     editedDestination 
    })
  } catch (error) {
    console.log(error)
  }
}

async function update (req,res){
  try {
    const destinationData = {...req.body}
    const editedDestination = await Destination.findById(req.params.id)
    editedDestination.name = destinationData.name
    editedDestination.favoriteSpots = destinationData.favoriteSpots
    editedDestination.budget = destinationData.budget
    await editedDestination.save()
    res.redirect(`/destinations/${req.params.id}`)
  } catch (error) {
    console.log(error)
  }
}