const { Schema } = require("mongoose");
const mongoose = require("../config/mongo");

const studentSchema = mongoose.model(
	"Student",
	new Schema({
		name: { type: String, default: null },
		email: { type: String, default: null, unique: true, required: true },
		github: {
			username: { type: String, default: null, unique: true, required: true },
		},
		zoom: {
			nickname: { type: String, default: null },
		},
		wakatime: {
			api: { type: String, default: null },
		},
		discord: {
			id: { type: String, default: null, unique: true, required: true },
		},
		isActive: { type: Boolean, default: true },
		isDelete: { type: Boolean, default: false },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	})
);

module.exports = studentSchema;
