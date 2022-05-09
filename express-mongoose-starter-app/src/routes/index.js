const express = require("express");
const router = express.Router();
const studentRoute = require("./student.routes");
const subjectRoute = require("./subject.routes");
const teacherRoute = require("./teacher.routes");

router.use("/student", studentRoute);
router.use("/teacher", teacherRoute);
router.use("/subject", subjectRoute);

module.exports = router;
