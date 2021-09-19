const cron = require("node-cron");
const getCommitAndPushStat = require("./getCommitAndPushStat");

const task = cron.schedule(
	process.env.CRON_SCHEDULE,
	() => {
		getCommitAndPushStat();
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = task;
