const Venue = require('../model/venueModel')

function generateRandomString() {
    const length = 8;
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}


const createVenue = async (req, res) => {
    const user = req.user;
    const image_url = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + req.body.image + ".jpg"

    const randomString = generateRandomString();


    if (user.role === "owner") {
        try {
            const newVenue = await Venue.create({
                name: req.body.name,
                owner: req.user.id,
                image: image_url,
                location: req.body.location,
                description: req.body.description,
                code: randomString
            })
            return res.status(201).json({ status: "okay", venue: newVenue });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(403).json({ message: 'User does not have permission.' });
    }
}

const getVenue = async (req, res) => {
    const result = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { code: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};
    const venue = await Venue.find(result)
    return res.status(200).json({ status: "okay", venue: venue })
}

const getVenueById = async (req, res) => {
    const user = req.user;
    try {
        const venue = await Venue.findOne({owner: user.id})
        return res.status(200).json({ status: "okay", venueInfo: venue });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getVenueAppById = async(req, res)=>{
    const venueId = req.params.id;
    try {
        const venue = await Venue.findOne({_id: venueId})
        return res.status(200).json({ status: "okay", venueInfo: venue });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
const updateVenue = async (req, res) => {

}

module.exports = {
    createVenue,
    getVenue,
    updateVenue,
    getVenueById
}