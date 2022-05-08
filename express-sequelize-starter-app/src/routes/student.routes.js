const express = require("express");
const router = express.Router();
const { studentControllers, cardControllers } = require("../controllers");
const {
  studentValidators,
  cardValidators,
} = require("../controllers/validator");
const validate = require("../middlewares/validator");
const { jwtAuthentication } = require("../middlewares/auth");
const { asyncHandler } = require("../utils");

router.get(
  "/",
  [jwtAuthentication],
  asyncHandler(studentControllers.information)
);
router.post(
  "/register",
  studentValidators.registerValidationRules,
  validate,
  asyncHandler(studentControllers.register)
);
router.post(
  "/login",
  studentValidators.loginValidationRules,
  validate,
  asyncHandler(studentControllers.login)
);
router.post(
  "/add-subject",
  [jwtAuthentication],
  studentValidators.addSubjectValidationRules,
  validate,
  asyncHandler(studentControllers.addSubject)
);
router.delete(
  "/delete-subject/:id",
  [jwtAuthentication],
  asyncHandler(studentControllers.deleteSubject)
);
router.delete("/", [jwtAuthentication], studentControllers.delete);
router.put(
  "/update-card",
  [jwtAuthentication],
  cardValidators.updateValidationRules,
  validate,
  asyncHandler(cardControllers.update)
);
router.put(
  "/update-subject",
  [jwtAuthentication],
  studentValidators.updateSubjectValidationRules,
  validate,
  asyncHandler(studentControllers.updateSubject)
);

module.exports = router;
