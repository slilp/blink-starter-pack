const express = require("express");
const router = express.Router();
const { subjectControllers } = require("../controllers");
const { apiKeyAuthentication } = require("../middlewares/auth");
const { subjectValidators } = require("../controllers/validator");
const validate = require("../middlewares/validator");
const { asyncHandler } = require("../utils");

router.post(
  "/",
  [apiKeyAuthentication],
  subjectValidators.createValidationRules,
  validate,
  asyncHandler(subjectControllers.create)
);
router.put(
  "/:id",
  [apiKeyAuthentication],
  asyncHandler(subjectControllers.update)
);
router.delete(
  "/:id",
  [apiKeyAuthentication],
  asyncHandler(subjectControllers.delete)
);
router.get(
  "/search",
  [apiKeyAuthentication],
  asyncHandler(subjectControllers.searchByName)
);
router.get(
  "/count-student",
  [apiKeyAuthentication],
  asyncHandler(subjectControllers.countStudentBySubject)
);
router.get(
  "/:id",
  [apiKeyAuthentication],
  asyncHandler(subjectControllers.information)
);

module.exports = router;
