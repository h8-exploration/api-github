const cron = require("node-cron");
const getWakatimeSummary = require("../helpers/getWakatimeSummary");
const WakatimeSummaryModel = require("../models/WakatimeSummaryModel");

const wakatimeSchedule = cron.schedule(
	process.env.WAKATIME_SCHEDULE,
	async () => {
		const summaries = await getWakatimeSummary();
		await WakatimeSummaryModel.insert(summaries);
	},
	{
		scheduled: false,
		timezone: "Asia/Jakarta",
	}
);

module.exports = wakatimeSchedule;
