const express = require("express")
const router = express.Router()
const {authenticateToken} = require("../middleWare/authMWare")

router.use(express.json())

const {
    addItem,
    getItem,
    getSingleitem,
    updateItem,
    deleteItem
} = require("../controller/itemController")

router.route('/addItem').post(authenticateToken, addItem)
router.get('/getSingleItem/(:id)', getSingleitem)
router.get('/getItem', getItem)
router.route('/update/(:id)').put(authenticateToken, updateItem)
router.route('/delete/(:id)').delete(authenticateToken, deleteItem)


module.exports = router;