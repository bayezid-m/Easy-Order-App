const Chef = require("../model/chefModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const addChef = async (req, res) => {
    const admin = req.user;
    const encriptPassword = await bcrypt.hash(req.body.password, 10)
    if (admin.role === "owner") {
        try {
            const newChef = await Chef.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: encriptPassword,
                venue_id: req.body.venue_id,
                owner: admin._id
            })
            return res.status(201).json({ status: "okay", chefInfo: newChef });
        } catch (error) {
            return res.status(500).json({ status: "false", error: error });
        }
    } else {
        return res.status(403).json({ message: 'User does not have permission.' });
    }
}

const getChef = async (req, res) => {
    const owner = req.user._id;
    try {
        const allChefs = await Chef.find({ owner: owner })
        return res.status(201).json({ status: "okay", chefs: allChefs });
    } catch (error) {
        return res.status(500).json({ status: "false", error: error });
    }
}

const loginChef = async (req, res) => {
    const chef = await Chef.findOne({
        email: req.body.email
    })
    if (!chef) {
        return res.status(403).json({ message: 'Chef not found.' });
    }
    const passwordMatch = await bcrypt.compare(
        req.body.password,
        chef.password
    )
    
    if (passwordMatch) {
        const token = jwt.sign(
            {
                id: chef._id,
                email: chef.email,
            },
            process.env.JWT_secret_token
            //,{ expiresIn: '1h' }
        )     
        return res.status(200).json({ status: "okay", chefInfo: chef, chefToken: token });
    } else {
        return res.status(500).json({ status: "false", error: error });
    }
}

const removeChef = async (req, res) => {
    const admin = req.user;
    const chefId = req.params.id;

    if (admin.role === "owner") {
        try {
            const removedChef = await Chef.deleteOne({ _id: chefId })
            return res.status(201).json({ status: "okay" });
        } catch (error) {
            return res.status(500).json({ status: "false", error: error });
        }
    } else {
        return res.status(403).json({ message: 'User does not have permission.' });
    }
}

module.exports = {
    addChef,
    getChef,
    loginChef,
    removeChef
}