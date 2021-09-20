const express = require("express");
require("dotenv").config();
const routes = require("./router");
const cors = require("cors");
const cron = require("./helpers/cron");
const wakatimeSchedule = require("./crons/wakatimeCron");
const sendWakatimeSummaryToDiscordCron = require("./crons/sendWakatimeSummaryToDiscordCron");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");

const { sendDiscordMessageQueue } = require("./helpers/bull");

const { router } = createBullBoard([new BullAdapter(sendDiscordMessageQueue)]);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
	res.status(200).json({
		message: "server running",
		discordGithubSchedule: process.env.CRON_SCHEDULE,
		discordGithubSchedule: process.env.CRON_SCHEDULE,
		discordWakatimeSchedule: process.env.DISCORD_WAKATIME_SCHEDULE,
		wakatimeSchedule: process.env.WAKATIME_SCHEDULE,
		minCommit: process.env.GITHUB_MIN_COMMIT,
		minCoding: process.env.WAKATIME_MIN_CODING,
	});
});

cron.start();
wakatimeSchedule.start();
sendWakatimeSummaryToDiscordCron.start();

app.use("/admin/queues", router);
app.use(routes);

module.exports = app;
