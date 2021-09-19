const StudentModel = require("../models/StudentModel");
const { WakaTimeClient } = require("wakatime-client");
const moment = require("moment");

const getWakatimeSummary = async (startDate, endDate, filter = {}) => {
	try {
		let start = moment()
			.subtract(1, "day")
			.format("YYYY-MM-DD");

		let end = moment()
			.subtract(1, "day")
			.format("YYYY-MM-DD");

		let condition = {
			isActive: true,
		};

		if (startDate) start = startDate;
		if (endDate) end = endDate;
		if (filter) condition = { ...condition, ...filter };

		const students = await StudentModel.findAll(condition);

		const wakatimeSummaryPromises = students.map((student) => {
			const client = new WakaTimeClient(
				student.wakatime.api,
				process.env.WAKATIME_API_URL
			);

			return client.getMySummary({
				dateRange: {
					startDate: start,
					endDate: end,
				},
			});
		});

		const summaries = await Promise.all(wakatimeSummaryPromises);
		const summariesPayload = summaries.map((summary, i) => {
			return {
				github: {
					username: students[i].github.username,
				},
				...summary,
			};
		});

		return summariesPayload;
	} catch (error) {
		console.log(
			"🚀 ~ file: getWakatimeSummary.js ~ line 36 ~ getWakatimeSummary ~ error",
			error
		);
	}
};

module.exports = getWakatimeSummary;
