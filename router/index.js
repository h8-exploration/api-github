const router = require("express").Router();
const github = require("./github");
const student = require("./student");
const sandbox = require("./sandbox");
const wakatime = require("./wakatime");

router.use("/github", github);
router.use("/students", student);
router.use("/sandbox", sandbox);
router.use("/wakatime", wakatime);

module.exports = router;
