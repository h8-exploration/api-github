const PushModel = require("../models/PushModel");
const StudentModel = require("../models/StudentModel");
const moment = require("moment");
const sendGithubStatToDiscordQueue = require("../queues/sendGithubStatToDiscordQueue");

const sendGithubStatToDiscord = async () => {
	try {
		const yesterday = moment()
			.subtract(1, "day")
			.format("YYYY-MM-DD");

		let condition = {};
		condition = {
			...condition,
			createdAt: {
				$gte: new Date(`${yesterday}T00:00:00.000Z`),
				$lt: new Date(`${yesterday}T23:59:59.000Z`),
			},
		};

		const students = await StudentModel.findAll({
			isActive: true,
		});

		const pushPromises = students.map((student) => {
			const pushes = PushModel.findAll({
				...condition,
				"pusher.name": student.github.username,
			});

			return pushes;
		});

		const pushes = await Promise.all(pushPromises);

		pushes.forEach((push, i) => {
			let commitCount = 0;
			let description = "";
			let pushCount = push.length;

			push.forEach((el) => {
				commitCount += el.commits.length;
				el.commits.forEach((commit) => {
					description +=
						"[`" +
						commit.id.substring(0, 7) +
						"`]" +
						`(${commit.url}) ${commit.message} - ${commit.author.name}\n`;
				});
			});

			const _payload = {
				discordId: students[i].discord.id,
				date: moment()
					.subtract(1, "day")
					.format("DD MMMM YYYY"),
				embed: {
					author: {
						name: push[0]?.sender?.login,
						url: push[0]?.sender?.url,
						icon_url: push[0]?.sender?.avatar_url,
					},
					title: `Push: ${pushCount}\nCommit: ${commitCount}\n`,
					description,
				},
			};

			if (commitCount < Number(process.env.GITHUB_MIN_COMMIT))
				sendGithubStatToDiscordQueue.add(_payload);
		});
	} catch (error) {
		console.log(
			"🚀 ~ file: sendGithubStatToDiscord.js ~ line 53 ~ sendGithubStatToDiscord ~ error",
			error
		);
	}
};

module.exports = sendGithubStatToDiscord;
