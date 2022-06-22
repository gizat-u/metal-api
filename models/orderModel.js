import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0
		},
		quantity: {
			type: Number,
			required: true,
			default: 0
		},
		lead_time: {
			type: Date,
			required: true,
		},
		properties: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
)

const OrderModel = mongoose.model("Order", orderSchema)

export default OrderModel;