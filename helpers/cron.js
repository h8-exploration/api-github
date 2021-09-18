const cron = require("node-cron");
const getCommitAndPushStat = require("./getCommitAndPushStat");

const task = cron.schedule(
	"0 0 8 * * *",
	() => {
		getCommitAndPushStat();
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = task;
