const WakatimeSummaryModel = require("../schemas/wakatimeSummarySchema");

class WakatimeSummary {
	static async insert(payload) {
		try {
			const data = await WakatimeSummaryModel.create(payload);
			return data;
		} catch (error) {
			throw { ...error, code: 400 };
		}
	}

	static async findAll(payload = {}) {
		try {
			const data = await WakatimeSummaryModel.find({
				...payload,
				isDelete: false,
			}).sort({ createdAt: "desc" });
			return data;
		} catch (error) {
			throw error;
		}
	}

	static async updateMany(filter = {}, payload = {}) {
		try {
			const data = await WakatimeSummaryModel.updateMany(filter, payload);
			return data;
		} catch (error) {
			throw { ...error, code: 400 };
		}
	}
}

module.exports = WakatimeSummary;
