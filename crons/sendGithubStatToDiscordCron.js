const cron = require("node-cron");
const sendGithubStatToDiscord = require("../helpers/sendGithubStatToDiscord");

const task = cron.schedule(
	process.env.DISCORD_GITHUB_SCHEDULE,
	async () => {
		await sendGithubStatToDiscord();
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = task;
