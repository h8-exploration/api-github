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

	static async findAll(payload) {
		try {
			const _payload = payload || {};
			const push = await PushModel.find(_payload);
			return push;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Push;
