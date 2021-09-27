const StudentModel = require("../models/StudentModel");
const ExcelJS = require("exceljs");

class Student {
	static findAll = async (req, res) => {
		try {
			const { githubUsername } = req.query;
			let condition = {};

			if (githubUsername) {
				const _githubUsername = githubUsername.split(",");
				condition = { ...condition, "github.username": _githubUsername };
			}

			const students = await StudentModel.findAll(condition);
			res.status(200).json(students);
		} catch (error) {
			res.status(error.code || 500).json(error);
		}
	};

	static create = async (req, res) => {
		try {
			const payload = req.body;
			const students = await StudentModel.insert(payload);
			res.status(200).json(students);
		} catch (error) {
			res.status(error.code || 500).json(error);
		}
	};

	static updateMany = async (req, res) => {
		try {
			const { payload, filter } = req.body;
			const students = await StudentModel.updateMany(filter, payload);
			res.status(200).json(students);
		} catch (error) {
			res.status(error.code || 500).json(error);
		}
	};

	static uploadExcel = async (req, res) => {
		try {
			let students = [];
			const wb = new ExcelJS.Workbook();
			const workbook = await wb.xlsx.load(req.file.buffer);

			workbook.eachSheet((sheet, id) => {
				sheet.eachRow((row, rowIndex) => {
					const payload = {
						name: row.values[2],
						email: row.values[3],
						github: {
							username: row.values[4],
						},
						zoom: {
							nickname: row.values[5],
						},
						wakatime: {
							api: row.values[6],
						},
						discord: {
							id: row.values[7],
						},
					};
					students.push(payload);
				});
			});
			const newStudents = await StudentModel.insert(students);
			res.status(200).json({ newStudents });
		} catch (error) {
			res.status(error.code || 500).json(error);
		}
	};
}

module.exports = Student;
