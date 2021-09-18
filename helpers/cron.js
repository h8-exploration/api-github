const cron = require("node-cron");
const sendDiscordMessage = require("./sendDiscordMessage");

const task = cron.schedule(
	process.env.CRON_SCHEDULE,
	() => {
		sendDiscordMessage();
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = task;
