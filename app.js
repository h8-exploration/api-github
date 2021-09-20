const express = require("express");
require("dotenv").config();
const routes = require("./router");
const cors = require("cors");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");

// cron
const wakatimeSchedule = require("./crons/wakatimeCron");
const sendWakatimeSummaryToDiscordCron = require("./crons/sendWakatimeSummaryToDiscordCron");
const sendGithubStatToDiscordCron = require("./crons/sendGithubStatToDiscordCron");
// queue
const sendWakatimeSummaryToDiscordQueue = require("./queues/sendWakatimeSummaryToDiscordQueue");
const sendGithubStatToDiscordQueue = require("./queues/sendGithubStatToDiscordQueue");

const { router } = createBullBoard([
	new BullAdapter(sendWakatimeSummaryToDiscordQueue),
	new BullAdapter(sendGithubStatToDiscordQueue),
]);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
	res.status(200).json({
		message: "server running",
		discordGithubSchedule: process.env.DISCORD_GITHUB_SCHEDULE,
		discordWakatimeSchedule: process.env.DISCORD_WAKATIME_SCHEDULE,
		wakatimeSchedule: process.env.WAKATIME_SCHEDULE,
		minCommit: process.env.GITHUB_MIN_COMMIT,
		minCoding: process.env.WAKATIME_MIN_CODING,
	});
});

wakatimeSchedule.start();
sendWakatimeSummaryToDiscordCron.start();
sendGithubStatToDiscordCron.start();

app.use("/admin/queues", router);
app.use(routes);

module.exports = app;
