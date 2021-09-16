const { Schema } = require("mongoose");
const mongoose = require("../config/mongo");

const pushSchema = mongoose.model(
	"Push",
	new Schema({
		repository: {
			id: { type: Number },
			node_id: { type: String },
			name: { type: String },
			full_name: { type: String },
			description: { type: String },
		},
		pusher: {
			name: { type: String },
			email: { type: String },
		},
		organization: {
			login: { type: String },
			id: { type: Number },
			node_id: { type: String },
			url: { type: String },
			avatar_url: { type: String },
			description: { type: String },
		},
		sender: {
			login: { type: String },
			id: { type: Number },
			node_id: { type: String },
			avatar_url: { type: String },
			url: { type: String },
			type: { type: String },
		},
		compare: { type: String },
		commits: [
			{
				id: { type: String },
				tree_id: { type: String },
				distinct: { type: String },
				message: { type: String },
				timestamp: { type: String },
				url: { type: String },
				author: {
					name: { type: String },
					email: { type: String },
					username: { type: String },
				},
				committer: {
					name: { type: String },
					email: { type: String },
					username: { type: String },
				},
				added: [{ type: String }],
				removed: [{ type: String }],
				modified: [{ type: String }],
			},
		],
		head_commit: {
			id: { type: String },
			tree_id: { type: String },
			distinct: { type: String },
			message: { type: String },
			timestamp: { type: String },
			url: { type: String },
			author: {
				name: { type: String },
				email: { type: String },
				username: { type: String },
			},
			committer: {
				name: { type: String },
				email: { type: String },
				username: { type: String },
			},
			added: [{ type: String }],
			removed: [{ type: String }],
			modified: [{ type: String }],
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
		isDelete: { type: Boolean, default: false },
	})
);

module.exports = pushSchema;
