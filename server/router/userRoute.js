const express = require("express")
const {authenticateToken} = require("../middleWare/authMWare")

const router = express.Router()
router.use(express.json())

const {
    registerUser,
    loginUser,
    getUser,
    updateUser
} = require('../controller/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.route('/getUser').get(authenticateToken, getUser)
router.route('/(:id)').put(authenticateToken, updateUser)

module.exports = router;