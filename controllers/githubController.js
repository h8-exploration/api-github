const PushModel = require("../models/PushModel");

class Push {
	static githubPushEvent = async (req, res, next) => {
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
}

module.exports = Push;
