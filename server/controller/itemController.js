const Item = require("../model/itemModel");
const Venue = require("../model/venueModel");

const addItem = async (req, res) => {
    const user = req.user;
    if (user.role === "owner") {
        try {
            const newItem = await Item.create({
                name: req.body.name,
                image: req.body.image,
                venue_id: req.body.venue_id,
                price: req.body.price,
                description: req.body.description
            })
            return res.status(201).json({ status: "okay", item: newItem });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        return res.status(403).json({ message: 'User does not have permission.' });
    }
}

const getSingleitem = async (req, res) => {
    const itemId = req.params.id
    try {
        const item = await Item.findById({ _id: itemId })
        return res.status(200).json({ status: "okay", itemInfo: item });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


const getItem = async (req, res) => {
    const result = req.query.venue
        ? {
            $or: [
                { name: { $regex: req.query.venue, $options: "i" } },
                { code: { $regex: req.query.venue, $options: "i" } },
            ],
        }
        : {};
    const venueInfo = await Venue.find(result)
    const venuId = venueInfo[0]._id;
    const items = await Item.find({ venue_id: venuId });
    return res.status(200).json({ status: "okay", venue: venueInfo[0], items: items })
}

const getItemOfVenue = async(req,res)=>{
     const venue = req.query.venue;
    try {
        const items = await Item.find({ venue_id: venue });
        const venueInfo = await Venue.findById({_id: venue})
        return res.status(200).json({ status: "okay", items: items, venueInfo:  venueInfo});
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}

const updateItem = async (req, res) => {

}
const deleteItem = async (req, res) => {
    const id = req.params.id
    try {
        const deletedITem = await Item.deleteOne({ _id: id })
        return res.status(200).json({ status: "okay" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}

//get 
module.exports = {
    addItem,
    getItem,
    getItemOfVenue,
    getSingleitem,
    updateItem,
    deleteItem
}