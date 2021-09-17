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

	static countCommitAndPush = async (req, res) => {
		try {
			const { orgName, repos, username } = req.query;

			let condition = {};

			if (orgName) {
				condition = { ...condition, "organization.login": orgName };
			}

			if (repos) {
				const _repos = repos.split(",");
				condition = { ...condition, "repository.name": _repos };
			}

			if (username) {
				condition = { ...condition, "pusher.name": username };
			}

			const pushes = await PushModel.findAll(condition);
			let commitCount = 0;
			pushes.forEach((push) => {
				push.commits.forEach((commit) => {
					commitCount++;
				});
			});
			const response = {
				orgName,
				repos,
				username,
				push: pushes.length,
				commit: commitCount,
			};
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ error });
		}
	};
}

module.exports = Push;
