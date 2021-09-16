const router = require("express").Router();
const GithubController = require("../controllers/githubController");

router.post("/", GithubController.githubPushEvent);
router.get("/", GithubController.findAll);
router.get("/count", GithubController.countCommitAndPush);

module.exports = router;
