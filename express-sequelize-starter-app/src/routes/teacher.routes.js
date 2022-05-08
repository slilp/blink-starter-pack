const express = require("express");
const router = express.Router();
const { teacherControllers } = require("../controllers");
const { apiKeyAuthentication } = require("../middlewares/auth");

router.post("/", [apiKeyAuthentication], teacherControllers.create);
router.put("/:id", [apiKeyAuthentication], teacherControllers.update);
router.delete("/:id", [apiKeyAuthentication], teacherControllers.delete);
router.get("/search", [apiKeyAuthentication], teacherControllers.searchByName);
router.get(
  "/count-teacher",
  [apiKeyAuthentication],
  teacherControllers.countTeacherBySubject
);

module.exports = router;
