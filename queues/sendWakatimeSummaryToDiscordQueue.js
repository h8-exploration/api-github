const Queue = require("bull");
const axios = require("axios");

const sendWakatimeSummaryToDiscordQueue = new Queue(
	"sendWakatimeSummaryToDiscord",
	{
		port: process.env.REDIS_PORT,
		host: process.env.REDIS_HOST,
		password: process.env.REDIS_PASSWORD,
	}
);

// customer
sendWakatimeSummaryToDiscordQueue.process(function(job, done) {
	const payload = {
		content: `Hi <@${job.data.discordId}>, berikut statistik coding kamu. Sepertinya kamu perlu lebih giat lagi. Semangat!`,
		tts: false,
		embeds: [
			{
				title: "Wakatime Stat",
				description: job.data.description,
			},
		],
		allowed_mentions: {
			parse: [],
		},
	};

	axios({
		url: `${process.env.DISCORD_API_URL}/channels/${process.env.DISCORD_CHANNEL_ID_WAKATIME}/messages`,
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
			done(new Error("error sendWakatimeSummaryToDiscordQueue"));
		});
});

// listener
sendWakatimeSummaryToDiscordQueue.on("completed", function(job, result) {
	console.log(
		"🚀 ~ file: sendWakatimeSummaryToDiscordQueue.js ~ line 40 ~ sendWakatimeSummaryToDiscordQueue.on ~ result",
		"completed"
	);
});

sendWakatimeSummaryToDiscordQueue.on("failed", function(job, result) {
	console.log(
		"🚀 ~ file: sendWakatimeSummaryToDiscordQueue.js ~ line 47 ~ sendWakatimeSummaryToDiscordQueue.on ~ result",
		result
	);
});

module.exports = sendWakatimeSummaryToDiscordQueue;
