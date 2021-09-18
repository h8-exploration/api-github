const StudentModel = require("../models/StudentModel");

class Student {
	static findAll = async (req, res) => {
		try {
			const students = await StudentModel.findAll();
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
}

module.exports = Student;
