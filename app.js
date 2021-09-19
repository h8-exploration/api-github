const express = require("express");
require("dotenv").config();
const routes = require("./router");
const cors = require("cors");
const cron = require("./helpers/cron");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");

const { sendDiscordMessageQueue } = require("./helpers/bull");

const { router } = createBullBoard([new BullAdapter(sendDiscordMessageQueue)]);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
	res
		.status(200)
		.json({ message: "server running", schedule: process.env.CRON_SCHEDULE });
});

cron.start();

app.use("/admin/queues", router);
app.use(routes);

module.exports = app;
