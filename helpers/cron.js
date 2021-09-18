const cron = require("node-cron");
const sendDiscordMessage = require("./sendDiscordMessage");
const bull = require("../helpers/bull");

const task = cron.schedule(
	"* * * * * *",
	() => {
		sendDiscordMessage();
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = task;
