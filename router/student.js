const router = require("express").Router();
const StudentController = require("../controllers/studentController");

router.get("/", StudentController.findAll);
router.post("/", StudentController.create);
router.post("/updateMany", StudentController.updateMany);

module.exports = router;
