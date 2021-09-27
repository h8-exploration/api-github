const router = require("express").Router();
const StudentController = require("../controllers/studentController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", StudentController.findAll);
router.post("/", StudentController.create);
router.post("/updateMany", StudentController.updateMany);
router.post(
	"/uploadExcel",
	upload.single("student"),
	StudentController.uploadExcel
);

module.exports = router;
