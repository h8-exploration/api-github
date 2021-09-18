const Queue = require("bull");

var sendDiscordMessageQueue = new Queue("sendDiscordMessage", {
	port: 16039,
	host: "redis-16039.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
	password: "8ApUJyB2Efw3wTgmYvtfFDUImi701bcg",
});

// producer
const addTask = (payload) => {
	sendDiscordMessageQueue.add(payload);
};

// customer
sendDiscordMessageQueue.process(function(job, done) {
	const error = false;

	if (!error)
		done(null, {
			message: `Send message to discord has been successfully`,
		});
	else done("send message to discord failed");
});

// listener
sendDiscordMessageQueue.on("completed", function(job, result) {
	console.log(
		"🚀 ~ file: bull.js ~ line 34 ~ sendDiscordMessageQueue.on ~ result",
		result
	);
});

sendDiscordMessageQueue.on("failed", function(job, result) {
	console.log(
		"🚀 ~ file: bull.js ~ line 41 ~ sendDiscordMessageQueue.on ~ result",
		result
	);
});

module.exports = { sendDiscordMessageQueue, addTask };
