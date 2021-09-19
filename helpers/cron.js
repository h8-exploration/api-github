const cron = require("node-cron");
const getCommitAndPushStat = require("./getCommitAndPushStat");

const schedule = process.env.CRON_SCHEDULE || "0 0 8 * * *";

const task = cron.schedule(
	schedule,
	() => {
		getCommitAndPushStat();
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = task;
