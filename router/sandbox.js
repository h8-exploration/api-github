const router = require("express").Router();

router.get("/", async (req, res) => {
	try {
		res.status(200).json({ msg: "hello world" });
	} catch (error) {
		console.log("🚀 ~ file: sandbox.js ~ line 49 ~ router.get ~ error", error);
		res.status(500).json(error);
	}
});

module.exports = router;
