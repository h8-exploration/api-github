const Queue = require("bull");
const WakatimeSummaryModel = require("../models/WakatimeSummaryModel");
const { WakaTimeClient } = require("wakatime-client");
const moment = require("moment");

const getWakatimeSummaryQueue = new Queue("getWakatimeSummaryQueue", {
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
	password: process.env.REDIS_PASSWORD,
});

// customer
getWakatimeSummaryQueue.process(async function(job, done) {
	try {
		let start = moment()
			.subtract(1, "day")
			.format("YYYY-MM-DD");

		let end = moment()
			.subtract(1, "day")
			.format("YYYY-MM-DD");

		const client = new WakaTimeClient(
			job.data.wakatimeApiKey,
			process.env.WAKATIME_API_URL
		);

		const summaryResp = await client.getMySummary({
			dateRange: {
				startDate: start,
				endDate: end,
			},
		});

		const summary = await WakatimeSummaryModel.insert({
			...summaryResp,
			github: {
				username: job.data.githubUsername,
			},
		});

		done(null, {
			summary,
		});
	} catch (error) {
		done(new Error("error getWakatimeSummaryQueue"));
	}
});

// listener
getWakatimeSummaryQueue.on("completed", function(job, result) {
	console.log(
		"🚀 ~ file: getWakatimeSummaryQueue.js ~ line 49 ~ getWakatimeSummaryQueue.on ~ getWakatimeSummaryQueue",
		"completed"
	);
});

getWakatimeSummaryQueue.on("failed", function(job, result) {
	console.log(
		"🚀 ~ file: getWakatimeSummaryQueue.js ~ line 56 ~ getWakatimeSummaryQueue.on ~ getWakatimeSummaryQueue",
		result
	);
});

module.exports = getWakatimeSummaryQueue;
