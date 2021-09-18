const router = require("express").Router();
const StudentController = require("../controllers/studentController");

router.get("/", StudentController.findAll);
router.post("/", StudentController.create);

module.exports = router;
