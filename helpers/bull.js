const Queue = require("bull");
const axios = require("axios");

var sendDiscordMessageQueue = new Queue("sendDiscordMessage", {
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
	password: process.env.REDIS_PASSWORD,
});

// producer
const addTask = (payload) => {
	sendDiscordMessageQueue.add(payload);
};

// customer
sendDiscordMessageQueue.process(function(job, done) {
	axios({
		url: `${process.env.DISCORD_API_URL}/channels/${process.env.DISCORD_CHANNEL_ID}/messages`,
		method: "POST",
		headers: {
			Authorization: `${process.env.DISCORD_CLIENT_ID}`,
		},
		data: job.data,
	})
		.then(({ data }) => {
			done(null, {
				data,
			});
		})
		.catch((err) => {
			done(new Error("error sendDiscordMessage"));
		});
});

// listener
sendDiscordMessageQueue.on("completed", function(job, result) {
	// console.log(
	// 	"🚀 ~ file: bull.js ~ line 34 ~ sendDiscordMessageQueue.on ~ result",
	// 	result
	// );
});

sendDiscordMessageQueue.on("failed", function(job, result) {
	// console.log(
	// 	"🚀 ~ file: bull.js ~ line 41 ~ sendDiscordMessageQueue.on ~ result",
	// 	result
	// );
});

module.exports = { sendDiscordMessageQueue, addTask };
