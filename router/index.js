const router = require("express").Router();
const github = require("./github");
const student = require("./student");

router.use("/github", github);
router.use("/students", student);

module.exports = router;
