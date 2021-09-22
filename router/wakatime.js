const router = require("express").Router();
const wakatimeController = require("../controllers/wakatimeController");

router.get("/", wakatimeController.findAll);

module.exports = router;
