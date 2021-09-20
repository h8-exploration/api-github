const router = require("express").Router();
const github = require("./github");
const student = require("./student");
const sandbox = require("./sandbox");

router.use("/github", github);
router.use("/students", student);
router.use("/sandbox", sandbox);

module.exports = router;
