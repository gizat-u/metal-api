import mongoose from "mongoose";
const { Schema } = mongoose;

const promotionSchema = new Schema(
	{
		lead_time: {
			type: Date,
			required: true,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Company"
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

const PromotionModel = mongoose.model("Promotion", promotionSchema)

export default PromotionModel;