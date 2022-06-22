import mongoose from "mongoose";
const { Schema } = mongoose;

const companySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		website: {
			type: String,
			required: true,
		},
		inn: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		properties: {
			type: String,
			required: true,
		},
		address_manufacturer: {
			type: String,
			required: true,
		},
		address_office: {
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
		},
		feedbacks: [
			{
				description: {
					type: String,
					required: true,
				},
				rate: {
					type: Number,
					required: true,
					default: 0,
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
		]
	},
	{
		timestamps: true
	}
)

const CompanyModel = mongoose.model("Company", companySchema)

export default CompanyModel;