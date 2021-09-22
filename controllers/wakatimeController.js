const WakatimeSummaryModel = require("../models/WakatimeSummaryModel");
const secondConvert = require("../helpers/secondConvert");

class WakatimeSummary {
	static findAll = async (req, res) => {
		try {
			let { username, startDate, endDate } = req.query;
			let condition = {};

			if (username) condition = { ...condition, "github.username": username };

			if (startDate) {
				condition = {
					...condition,
					createdAt: {
						$gte: new Date(`${startDate}T00:00:00.000Z`),
						$lt: new Date(`${endDate}T23:59:59.000Z`),
					},
				};
			}

			if (endDate)
				condition = {
					...condition,
					createdAt: {
						$gte: new Date(`${startDate}T00:00:00.000Z`),
						$lt: new Date(`${endDate}T23:59:59.000Z`),
					},
				};

			let totalSeconds = 0;
			let projects = [];
			const wakatimes = await WakatimeSummaryModel.findAll(condition);

			wakatimes.forEach((wakatime) => {
				wakatime.data.forEach((el) => {
					totalSeconds += el.grand_total.total_seconds;
					el.projects.forEach((project) => {
						const checker = projects.find((prjct) => prjct.name === project.name);
						if (!checker) {
							projects.push({
								name: project.name,
								hours: project.hours,
								minutes: project.minutes,
								seconds: project.seconds,
								total_seconds: project.total_seconds,
								text: secondConvert(project.total_seconds),
							});
						} else {
							const projetcsIndex = projects.findIndex(
								(pr) => pr.name === project.name
							);
							projects[projetcsIndex] = {
								...projects[projetcsIndex],
								hours: projects[projetcsIndex].hours + project.hours,
								minutes: projects[projetcsIndex].minutes + project.minutes,
								seconds: projects[projetcsIndex].seconds + project.seconds,
								total_seconds:
									projects[projetcsIndex].total_seconds + project.total_seconds,
								text: secondConvert(
									projects[projetcsIndex].total_seconds + project.total_seconds
								),
							};
						}
					});
				});
			});

			res.status(200).json({
				username,
				startDate,
				endDate,
				cumulative: secondConvert(totalSeconds),
				projects,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	};
}

module.exports = WakatimeSummary;
