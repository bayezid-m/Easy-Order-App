const Order = require("../model/orderModel")
//const {emitOrderEvent} = require('../index')

const addOrder = async (req, res) => {
    const user = req.user;
    try {
        const newOrder = await Order.create({
            user_id: user._id,
            item_id: req.body.item_id,
            venue_id: req.body.venue_id,
            price: req.body.price,
            note: req.body.note,
            status: 0,
            quantity: req.body.quantity
        })
        //emitOrderEvent('newOrder', newOrder);
        return res.status(201).json({ status: "okay", orderInfo: newOrder });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getOrder = async (req, res) => {
    const user = req.user;

    try {
        const userOrder = await Order.find({ user_id: user._id }).populate('item_id');
        return res.status(200).json({ status: "okay", orders: userOrder });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getOrderOfVenue = async(req, res)=>{
    const venue_id = req.params.id;
    try {
        const venueOrders = await Order.find({venue_id: venue_id}).populate('item_id')
        return res.status(200).json({ status: "okay", orders: venueOrders });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

//this update is only from chef screen
const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const updatedOrder = await Order.findByIdAndUpdate({ _id: orderId }, {
            status: req.body.status,
        })
        //emitOrderEvent('updateOrder', updatedOrder);
        return res.status(200).json({ status: "okay", order: updatedOrder });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


//this is from customer from mobile app
const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const deleteOrder = await Order.deleteOne({ _id: orderId })
        return res.status(200).json({ status: "okay" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    addOrder,
    getOrder,
    getOrderOfVenue,
    updateOrder,
    deleteOrder
}