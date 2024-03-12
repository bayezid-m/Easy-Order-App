const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
        last_name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		image: {type: String},
        role: { type: String, default: "user" }	
	},
    {
        timestamps: true
    },
	{ collection: 'User' }
)

const model = mongoose.model('User', User)

module.exports = model