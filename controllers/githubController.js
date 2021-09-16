const PushModel = require("../models/PushModel");

class Push {
	static githubPushEvent = async (req, res) => {
		try {
			const push = await PushModel.insertOne(req.body);
			res.status(201).json({ message: "successfully" });
		} catch (error) {
			console.log(
				"🚀 ~ file: githubController.js ~ line 9 ~ Push ~ githubEvent= ~ error",
				error
			);
			res.status(500).json({ message: "Internal server error" });
		}
	};

	static findAll = async (_, res) => {
		try {
			const pushes = await PushModel.findAll();
			res.status(200).json(pushes);
		} catch (error) {
			res.status(500).json({ error });
		}
	};
}

module.exports = Push;
