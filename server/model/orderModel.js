const mongoose = require('mongoose')

const Item = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        venue_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Venue" },
        item_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Item" },
        price: { type: Number, required: true },
        note: { type: String, required: false },
        status: { type: Boolean, default: 0 },
        quantity: {type: Number, required: true},
    },
    {
        timestamps: true
    },
    { collection: 'Item' }
)

const model = mongoose.model('Item', Item)

module.exports = model