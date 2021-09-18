const StudentModel = require("../schemas/studentSchema");

class Student {
	static async insert(payload) {
		try {
			const student = await StudentModel.create(payload);
			return student;
		} catch (error) {
			throw { ...error, code: 400 };
		}
	}

	static async findAll(payload = {}) {
		try {
			const student = await StudentModel.find({
				...payload,
				isDelete: false,
			}).sort({ createdAt: "desc" });
			return student;
		} catch (error) {
			throw error;
		}
	}

	static async updateMany(filter = {}, payload = {}) {
		try {
			const students = await StudentModel.updateMany(filter, payload);
			return students;
		} catch (error) {
			throw { ...error, code: 400 };
		}
	}
}

module.exports = Student;
