const PushModel = require("../schemas/pushSchema");

class Push {
	static async insertOne(payload) {
		try {
			const push = await PushModel.create(payload);
			return push;
		} catch (error) {
			throw error;
		}
	}

	static async findAll() {
		try {
			const push = await PushModel.find();
			return push;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Push;
