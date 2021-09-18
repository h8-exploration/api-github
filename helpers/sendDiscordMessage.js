const { addTask } = require("./bull");

const sendDiscordMessage = (payload) => {
	const _payload = {
		content: `Hi <@${payload.discordId}>, berikut statistik commit dan push kamu. Sepertinya kamu perlu lebih giat lagi. Semangat!`,
		tts: false,
		embeds: [
			{
				title: "Github Stat",
				description: `Push: ${payload.push}; Commit: ${payload.commit};`,
			},
		],
		allowed_mentions: {
			parse: [],
		},
	};
	addTask(_payload);
};

module.exports = sendDiscordMessage;
