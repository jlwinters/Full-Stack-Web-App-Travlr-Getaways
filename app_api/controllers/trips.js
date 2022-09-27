// Import the Mongoose database library and our schema so it is available to use
const mongoose = require('mongoose'); //.set('debug', true);
const Model = mongoose.model('trips');

// GET: /trips  - lists all the trips (callback method registered in the /api/trips/ route)
const tripsList = async (req,res) => {
    Model
        .find({}) // Use the mongoose .find() method with no filter criteria to return all instances
        .exec((err, trips) => {
            if (!trips) {
                // If nothing is returned, send an HTTP 404 status
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                // If data was retrieved, send to the client with an HTTP 200 success status
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - returns a single trip (callback method registered in the /api/trips/{tripcode} route)
const tripsFindByCode = async (req, res) => {
    Model
    // Use the mongoose .find() method with a filter set to the tripCode passed on the URL
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

module.exports = {
    tripsList,
    tripsFindByCode
};