const express = require("express")
const {authenticateToken} = require("../middleWare/authMWare")

const router = express.Router()
router.use(express.json())

const {
    addChef,
    getChef,
    loginChef,
    removeChef
} = require("../controller/chefController")


router.route('/addChef').post(authenticateToken, addChef)
router.route('/getChef').get(authenticateToken, getChef)
router.post('/loginChef', loginChef)
router.route('/deleteChef/(:id)').delete(authenticateToken, removeChef)

module.exports = router;