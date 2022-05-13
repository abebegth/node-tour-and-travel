const express = require("express");

// import the tour controller
const tourController = require('./../controllers/tourController');

const router = express.Router(); // creating a new router for the tours resource


router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.delteTour);

module.exports = router;