const PushModel = require("../models/PushModel");
const StudentModel = require("../models/StudentModel");
const moment = require("moment");
const sendDiscordMessage = require("./sendDiscordMessage");

const getCommitAndPushStat = async () => {
	try {
		const today = moment().format("YYYY-MM-DD");
		const yesterday = moment()
			.subtract(1, "day")
			.format("YYYY-MM-DD");

		let condition = {};
		condition = {
			...condition,
			createdAt: {
				$gte: new Date(`${yesterday}T00:00:00.000Z`),
				$lt: new Date(`${today}T00:00:00.000Z`),
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
			const _payload = {
				discordId: students[i].discord.id,
				name: students[i].name,
				push: push.length,
				commit: 0,
			};

			push.forEach((el) => {
				_payload.commit += el.commits.length;
			});

			if (_payload.commit < Number(process.env.GITHUB_MIN_COMMIT))
				sendDiscordMessage(_payload);
		});
	} catch (error) {
		console.log(
			"🚀 ~ file: getCommitAndPushStat.js ~ line 56 ~ getCommitAndPushStat ~ error",
			error
		);
	}
};

module.exports = getCommitAndPushStat;
