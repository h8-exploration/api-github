const router = require("express").Router();
const sendGithubStatToDiscord = require("../helpers/sendGithubStatToDiscord");

router.get("/", async (req, res) => {
	try {
		const x = await sendGithubStatToDiscord();
		res.status(200).json({ msg: "hello world", x });
	} catch (error) {
		console.log("🚀 ~ file: sandbox.js ~ line 49 ~ router.get ~ error", error);
		res.status(500).json(error);
	}
});

module.exports = router;
