const Item = require("../model/itemModel");

const addItem = async (req, res) => {
    const user = req.user;
    console.log(req.body)
    // const image_url = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + req.body.image + ".jpg"
    if (user.role === "owner") {
        try {
            const newItem = await Item.create({
                name: req.body.name,
                image: req.body.images,
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
    const venue = req.query.venue;
    //const name = req.query.name;

    try {
        const items = await Item.find({ venue_id: venue });

        return res.status(200).json({ status: "okay", items: items });

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

module.exports = {
    addItem,
    getItem,
    getSingleitem,
    updateItem,
    deleteItem
}