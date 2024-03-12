const mongoose = require('mongoose')

const Card = new mongoose.Schema(
    {
        number: { type: Number, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        expire: {type: Number, required: true},
    },
    {
        timestamps: true
    },
    { collection: 'Card' }
)

const model = mongoose.model('Card', Card)

module.exports = model