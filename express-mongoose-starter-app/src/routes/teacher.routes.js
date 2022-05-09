const express = require("express");
const router = express.Router();
const { teacherControllers } = require("../controllers");
const { apiKeyAuthentication } = require("../middlewares/auth");
const { teacherValidators } = require("../controllers/validator");
const validate = require("../middlewares/validator");
const { asyncHandler } = require("../utils");

router.post(
  "/",
  [apiKeyAuthentication],
  teacherValidators.createValidationRules,
  validate,
  asyncHandler(teacherControllers.create)
);
router.put(
  "/:id",
  [apiKeyAuthentication],
  asyncHandler(teacherControllers.update)
);
router.delete(
  "/:id",
  [apiKeyAuthentication],
  asyncHandler(teacherControllers.delete)
);
router.get(
  "/search",
  [apiKeyAuthentication],
  asyncHandler(teacherControllers.searchByName)
);
router.get(
  "/count-teacher",
  [apiKeyAuthentication],
  asyncHandler(teacherControllers.countTeacherBySubject)
);

module.exports = router;
