const { addTask } = require("./bull");

const sendDiscordMessage = () => {
	//  get student data
	// get push data
	//  add data to queue
	const payload = {
		content: "Hi there from <@707500844043599884>",
		tts: false,
		embeds: [
			{
				title: "Github Stat",
				description: "Push: 0; Commit: 0;",
			},
		],
		allowed_mentions: {
			parse: [],
		},
	};
	addTask(payload);
};

module.exports = sendDiscordMessage;
