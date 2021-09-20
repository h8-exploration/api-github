const StudentModel = require("../models/StudentModel");
const WakatimeSummaryModel = require("../models/WakatimeSummaryModel");
const moment = require("moment");
const sendWakatimeSummaryToDiscordQueue = require("../queues/sendWakatimeSummaryToDiscordQueue");

const sendWakatimeSummaryToDiscord = async () => {
	try {
		const students = await StudentModel.findAll({
			isActive: true,
		});

		const today = moment().format("YYYY-MM-DD");

		const wakatimeSummaryPromises = students.map((student) => {
			return WakatimeSummaryModel.findAll({
				"github.username": student.github.username,
				createdAt: {
					$gte: new Date(`${today}T00:00:00.000Z`),
					$lt: new Date(`${today}T23:59:59.000Z`),
				},
			});
		});

		const summaries = await Promise.all(wakatimeSummaryPromises);
		summaries.forEach((summary, i) => {
			if (summary.length > 0) {
				summary.forEach((wakatime) => {
					if (
						Number(wakatime.cummulative_total.decimal) <
						process.env.WAKATIME_MIN_CODING
					) {
						let description = `${moment()
							.subtract(1, "day")
							.format("dddd, DD MMMM YYYY")} (${wakatime.cummulative_total.text})\n`;

						wakatime.data[0].projects.forEach((project) => {
							description += `- ${project.name}: ${project.text}\n`;
						});

						const payload = {
							discordId: students[i].discord.id,
							description,
						};

						sendWakatimeSummaryToDiscordQueue.add(payload);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"🚀 ~ file: sendWakatimeSummaryToDiscord.js ~ line 53 ~ sendWakatimeSummaryToDiscord ~ error",
			error
		);
	}
};

module.exports = sendWakatimeSummaryToDiscord;
