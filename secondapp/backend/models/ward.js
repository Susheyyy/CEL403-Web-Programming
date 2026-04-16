
const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		prn: {
			type: String,
			required: true,
			trim: true,
		},
		subject: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Ward', wardSchema);
