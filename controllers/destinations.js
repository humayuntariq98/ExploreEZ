const {google} = require('googleapis');
const Destination = require('../models/destination')
const places = google.places({version: 'v1', auth: 'AIzaSyDow7IsqGBAMSQODNq7yFQ-LE9Gb1fH79Y'});  
const axios = require('axios');
module.exports = {
    index,
    newDestination,
    create,
    show, 
    edit,
    update,
    removeDestination
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
    console.log(error)  
  }
}


async function create (req, res) {
  const destinationData = {...req.body};
  try {
     
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
          params: {
              query: req.body.name,
              key: 'AIzaSyDow7IsqGBAMSQODNq7yFQ-LE9Gb1fH79Y'  
          }
      });
      console.log('create response:', response)
      
      if (response.data.results && response.data.results[0] && response.data.results[0].photos) {
          const photoReference = response.data.results[0].photos[0].photo_reference;
          const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=AIzaSyDow7IsqGBAMSQODNq7yFQ-LE9Gb1fH79Y`;

          
          destinationData.image = imageUrl;
          // console.log('imageURL:', imageUrl)
          // console.log('photoReference:', photoReference)
      }

      const newDestination = await Destination.create(destinationData);
      res.redirect('/destinations');
  } catch (error) {
      console.log(error);
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

async function removeDestination (req,res) {
  try {
    // const destinationDeleted = await Destination.findById(req.params.id)
    // await Destination.deleteOne(destinationDeleted)
    await Destination.deleteOne(Destination.findById(req.params.id));
    console.log("remove Destination", Destination.findById(req.params.id ))
    res.redirect ("/destinations")
  } catch (error) {
    console.log(error)
  }
}