const Queue = require("bull");
const axios = require("axios");

const sendGithubStatToDiscordQueue = new Queue("sendGithubStatToDiscordQueue", {
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
	password: process.env.REDIS_PASSWORD,
});

// customer
sendGithubStatToDiscordQueue.process(function(job, done) {
	const payload = {
		content:
			"Hi <@" +
			job.data.discordId +
			">, berikut data commit dan push kamu tanggal `" +
			job.data.date +
			"`. Sepertinya kamu perlu lebih giat lagi. Semangat!",
		tts: false,
		embeds: [job.data.embed],
		allowed_mentions: {
			parse: [],
		},
	};

	axios({
		url: `${process.env.DISCORD_API_URL}/channels/${process.env.DISCORD_CHANNEL_ID_GITHUB}/messages`,
		method: "POST",
		headers: {
			Authorization: `${process.env.DISCORD_CLIENT_ID}`,
		},
		data: payload,
	})
		.then(({ data }) => {
			done(null, {
				data,
			});
		})
		.catch((err) => {
			done(new Error("error sendGithubStatToDiscordQueue"));
		});
});

// listener
sendGithubStatToDiscordQueue.on("completed", function(job, result) {
	console.log(
		"🚀 ~ file: sendGithubStatToDiscordQueue.js ~ line 46 ~ sendGithubStatToDiscordQueue.on ~ sendGithubStatToDiscordQueue"
	);
});

sendGithubStatToDiscordQueue.on("failed", function(job, result) {
	console.log(
		"🚀 ~ file: sendGithubStatToDiscordQueue.js ~ line 52 ~ sendGithubStatToDiscordQueue.on ~ sendGithubStatToDiscordQueue",
		sendGithubStatToDiscordQueue
	);
});

module.exports = sendGithubStatToDiscordQueue;
