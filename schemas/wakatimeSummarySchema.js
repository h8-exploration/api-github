const { Schema } = require("mongoose");
const mongoose = require("../config/mongo");

const wakatimeSummary = mongoose.model(
	"WakatimeSummary",
	new Schema({
		github: {
			username: { type: String },
		},
		cummulative_total: {
			decimal: { type: String },
			digital: { type: String },
			seconds: { type: Number },
			text: { type: String },
		},
		data: [
			{
				categories: [
					{
						decimal: { type: String },
						digital: { type: String },
						hours: { type: Number },
						minutes: { type: Number },
						name: { type: String },
						percent: { type: Number },
						seconds: { type: Number },
						text: { type: String },
						total_seconds: { type: Number },
					},
				],
				dependencies: [
					{
						decimal: { type: String },
						digital: { type: String },
						hours: { type: Number },
						minutes: { type: Number },
						name: { type: String },
						percent: { type: Number },
						seconds: { type: Number },
						text: { type: String },
						total_seconds: { type: Number },
					},
				],
				editors: [
					{
						decimal: { type: String },
						digital: { type: String },
						hours: { type: Number },
						minutes: { type: Number },
						name: { type: String },
						percent: { type: Number },
						seconds: { type: Number },
						text: { type: String },
						total_seconds: { type: Number },
					},
				],
				grand_total: {
					decimal: { type: String },
					digital: { type: String },
					hours: { type: Number },
					minutes: { type: Number },
					text: { type: String },
					total_seconds: { type: Number },
				},
				languages: [
					{
						decimal: { type: String },
						digital: { type: String },
						hours: { type: Number },
						minutes: { type: Number },
						name: { type: String },
						percent: { type: Number },
						seconds: { type: Number },
						text: { type: String },
						total_seconds: { type: Number },
					},
				],
				machines: [
					{
						decimal: { type: String },
						digital: { type: String },
						hours: { type: Number },
						machine_name_id: { type: String },
						minutes: { type: Number },
						name: { type: String },
						percent: { type: Number },
						seconds: { type: Number },
						text: { type: String },
						total_seconds: { type: Number },
					},
				],
				operating_systems: [
					{
						decimal: { type: String },
						digital: { type: String },
						hours: { type: Number },
						minutes: { type: Number },
						name: { type: String },
						percent: { type: Number },
						seconds: { type: Number },
						text: { type: String },
						total_seconds: { type: Number },
					},
				],
				projects: [
					{
						decimal: { type: String },
						digital: { type: String },
						hours: { type: Number },
						minutes: { type: Number },
						name: { type: String },
						percent: { type: Number },
						seconds: { type: Number },
						text: { type: String },
						total_seconds: { type: Number },
					},
				],
				range: {
					date: { type: String },
					end: { type: String },
					start: { type: String },
					text: { type: String },
					timezone: { type: String },
				},
			},
		],
		end: { type: String },
		start: { type: String },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
		isDelete: { type: Boolean, default: false },
	})
);

module.exports = wakatimeSummary;
