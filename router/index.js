const router = require("express").Router();
const github = require("./github");

router.use("/github", github);

module.exports = router;
