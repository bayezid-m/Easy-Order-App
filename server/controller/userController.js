const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const User = require("../model/userModel")

const registerUser = async (req, res) => {
    const encriptPassword = await bcrypt.hash(req.body.password, 10)
    const image_url = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + req.body.image + ".jpg"

    try {
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: encriptPassword,
            image: image_url,
            role: req.body.role,
        })
        return res.status(201).json({status: "okay", userInfo: newUser });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}
const loginUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(403).json({ message: 'User not found.' });
    }
    const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if (passwordMatch) {
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_secret_token
            ,{ expiresIn: '1h' }
        )
        return res.status(200).json({status: "okay", userInfo: user, token: token });
    } else {
        return res.status(500).json({status: "false", error: error });
    }
}

const getUser = async (req, res) => {
    return res.status(200).json({status: "okay", userInfo: req.user });
}

const updateUser = async (req, res) => {
    try {
        const user_id = req.params.id
        const updatedUser = await User.updateOne({ _id: user_id }, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
        })
        return res.status(200).json({status: "update successful"})
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser
}