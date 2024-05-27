const mongoose = require('mongoose')

const Chef = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
        last_name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        role: { type: String, default: "chef" },	
		venue_id: { type: mongoose.Schema.Types.ObjectId, ref: "Venue"},
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	},
    {
        timestamps: true
    },
	{ collection: 'Chef' }
)

const model = mongoose.model('Chef', Chef)

module.exports = model