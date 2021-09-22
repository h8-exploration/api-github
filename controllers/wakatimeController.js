const WakatimeSummaryModel = require("../models/WakatimeSummaryModel");
const secondConvert = require("../helpers/secondConvert");
const moment = require("moment");

class WakatimeSummary {
	static findAll = async (req, res) => {
		try {
			let { username, startDate, endDate } = req.query;
			console.log(
				"🚀 ~ file: wakatimeController.js ~ line 9 ~ WakatimeSummary ~ findAll= ~ startDate",
				startDate
			);
			let condition = {};

			if (username) condition = { ...condition, "github.username": username };

			if (startDate) {
				condition = {
					...condition,
					createdAt: {
						$gte: new Date(`${startDate}T00:00:00.000Z`),
						$lt: new Date(`${startDate}T23:59:59.000Z`),
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

			let totalHours = 0;
			let totalMinutes = 0;
			let totalSeconds = 0;
			let projects = [];
			let projectsPerDayText = [];
			const wakatimes = await WakatimeSummaryModel.findAll(condition, "asc");

			wakatimes.forEach((wakatime, i) => {
				wakatime.data.forEach((el) => {
					totalHours += el.grand_total.hours;
					totalMinutes += el.grand_total.minutes;
					totalSeconds += el.grand_total.total_seconds;
					let projectsText = `${moment(startDate)
						.add(i, "day")
						.format("ddd, MMM. Do YYYY")}\n${secondConvert(
						el.grand_total.total_seconds
					)}\n`;
					let status = el.grand_total.hours >= 5 ? "✅ " : "🆘";
					el.projects.forEach((project) => {
						projectsText += `- ${project.name}: ${secondConvert(
							project.total_seconds
						)}\n`;
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
					projectsPerDayText.push(`${projectsText} status: ${status}`);
				});
			});

			if (totalMinutes >= 60) {
				totalHours += Math.floor(totalMinutes / 60);
				totalMinutes = totalMinutes % 60;
			}

			const cumulative = {
				hours: totalHours,
				minutes: totalMinutes,
				text: secondConvert(totalSeconds),
			};
			let projectsText = `${cumulative.text}\n`;
			projects.forEach((el) => {
				projectsText += `- ${el.name}: ${el.text}\n`;
			});

			res.status(200).json({
				username,
				startDate,
				endDate,
				cumulative,
				projectsPerDayText,
				projectsText,
				projects,
			});
		} catch (error) {
			console.log(
				"🚀 ~ file: wakatimeController.js ~ line 84 ~ WakatimeSummary ~ findAll= ~ error",
				error
			);
			res.status(500).json(error);
		}
	};
}

module.exports = WakatimeSummary;
