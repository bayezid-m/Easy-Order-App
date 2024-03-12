const express = require("express")
const router = express.Router()
const {authenticateToken} = require("../middleWare/authMWare")

router.use(express.json())

const {
    createVenue,
    getVenue,
    updateVenue,
    getVenueById 
} = require("../controller/venueController")

router.route('/create').post(authenticateToken, createVenue)
router.get('/getVenue', getVenue)
router.route('/getVenueById').get(authenticateToken, getVenueById)
router.route('/update/(:id)').put(authenticateToken, updateVenue)


module.exports = router;