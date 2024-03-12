const mongoose = require('mongoose')

const Item = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: {
            type: [String],
            default: [],
        },
        venue_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Venue" },
        price: {type: Number, required: true},
        description: { type: String, required: false }
    },
    {
        timestamps: true
    },
    { collection: 'Item' }
)

const model = mongoose.model('Item', Item)

module.exports = model