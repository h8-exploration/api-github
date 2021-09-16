const router = require("express").Router();
const GithubController = require("../controllers/githubController");

router.post("/", GithubController.githubPushEvent);

module.exports = router;
