const express = require("express");
const router = express.Router();
const { subjectControllers } = require("../controllers");
const { apiKeyAuthentication } = require("../middlewares/auth");
const { subjectValidators } = require("../controllers/validator");
const validate = require("../middlewares/validator");

router.post(
  "/",
  [apiKeyAuthentication],
  subjectValidators.createValidationRules,
  validate,
  subjectControllers.create
);
router.put(
  "/update-grade",
  subjectValidators.updateGradeOfStudentValidationRules,
  validate,
  [apiKeyAuthentication],
  subjectControllers.updateGradeOfStudent
);
router.put("/:id", [apiKeyAuthentication], subjectControllers.update);
router.delete("/:id", [apiKeyAuthentication], subjectControllers.delete);
router.get("/search", [apiKeyAuthentication], subjectControllers.searchByName);
router.get(
  "/count-student",
  [apiKeyAuthentication],
  subjectControllers.countStudentBySubject
);
router.get("/:id", [apiKeyAuthentication], subjectControllers.information);

module.exports = router;
