const cron = require("node-cron");
const getWakatimeSummaryQueue = require("../queues/getWakatimeSummaryQueue");
const StudentModel = require("../models/StudentModel");

const getWakatimeSummaryCron = cron.schedule(
	process.env.WAKATIME_SCHEDULE,
	async () => {
		try {
			const students = await StudentModel.findAll();
			students.forEach((student) => {
				getWakatimeSummaryQueue.add({
					wakatimeApiKey: student.wakatime.api,
					githubUsername: student.github.username,
				});
			});
			console.log("wakatimeSchedule");
		} catch (error) {
			console.log("🚀 ~ file: wakatimeCron.js ~ line 14 ~ error", error);
		}
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = getWakatimeSummaryCron;
