const cron = require("node-cron");
const sendWakatimeSummaryToDiscord = require("../helpers/sendWakatimeSummaryToDiscord");

const sendWakatimeSummaryToDiscordCron = cron.schedule(
	process.env.DISCORD_WAKATIME_SCHEDULE,
	async () => {
		try {
			sendWakatimeSummaryToDiscord();
		} catch (error) {
			console.log(
				"🚀 ~ file: sendWakatimeSummaryToDiscordCron.js ~ line 54 ~ error",
				error
			);
		}
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = sendWakatimeSummaryToDiscordCron;
