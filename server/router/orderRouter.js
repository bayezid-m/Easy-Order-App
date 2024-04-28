const express = require("express")
const router = express.Router()
const {authenticateToken} = require("../middleWare/authMWare")

router.use(express.json())

const {
    addOrder,
    getOrder,
    updateOrder,
    deleteOrder
} = require("../controller/orderController")


router.route('/addOrder').post(authenticateToken, addOrder)
router.route('/getOrder').get(authenticateToken, getOrder)
router.put('/update/(:id)', updateOrder)
router.route('/deleteOrder/(:id)').delete(authenticateToken, deleteOrder)


module.exports = router;