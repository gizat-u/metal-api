const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, default: "user" },
		image: { type: String, required: true },
		balance: { type: Number, default: 0 },
		isActivated: { type: Boolean, default: false },
		activationLink: { type: String, required: true }
	},
	{
		timestamps: true
	}
)

module.exports = model("User", UserSchema);