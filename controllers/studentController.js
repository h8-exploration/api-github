const StudentModel = require("../models/StudentModel");

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
}

module.exports = Student;
