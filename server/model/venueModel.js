const mongoose = require('mongoose')

const Venue = new mongoose.Schema(
	{
		name: { type: String, required: true },
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
		image: {type: String},
        location: { type: String, required: false},	
        description: { type: String, required: false},
		code: { type: String, required: false}
	},
    {
        timestamps: true
    },
	{ collection: 'Venue' }
)

const model = mongoose.model('Venue', Venue)


module.exports = model