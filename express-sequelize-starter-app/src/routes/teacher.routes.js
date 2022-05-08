const express = require("express");
const router = express.Router();
const { teacherControllers } = require("../controllers");
const { apiKeyAuthentication } = require("../middlewares/auth");
const { teacherValidators } = require("../controllers/validator");
const validate = require("../middlewares/validator");

router.post(
  "/",
  [apiKeyAuthentication],
  teacherValidators.createValidationRules,
  validate,
  teacherControllers.create
);
router.put("/:id", [apiKeyAuthentication], teacherControllers.update);
router.delete("/:id", [apiKeyAuthentication], teacherControllers.delete);
router.get("/search", [apiKeyAuthentication], teacherControllers.searchByName);
router.get(
  "/count-teacher",
  [apiKeyAuthentication],
  teacherControllers.countTeacherBySubject
);

module.exports = router;
