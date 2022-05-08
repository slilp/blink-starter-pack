const express = require("express");
const router = express.Router();
const { studentControllers, cardControllers } = require("../controllers");
const {
  studentValidators,
  cardValidators,
} = require("../controllers/validator");
const validate = require("../middlewares/validator");
const { jwtAuthentication } = require("../middlewares/auth");

router.get("/", [jwtAuthentication], studentControllers.information);
router.post(
  "/register",
  studentValidators.registerValidationRules,
  validate,
  studentControllers.register
);
router.post(
  "/login",
  studentValidators.loginValidationRules,
  validate,
  studentControllers.login
);
router.post(
  "/add-subject",
  [jwtAuthentication],
  studentValidators.addSubjectValidationRules,
  validate,
  studentControllers.addSubject
);
router.delete(
  "/delete-subject/:id",
  [jwtAuthentication],
  studentControllers.deleteSubject
);
router.delete("/", [jwtAuthentication], studentControllers.delete);
router.put(
  "/update-card",
  [jwtAuthentication],
  cardValidators.updateValidationRules,
  validate,
  cardControllers.update
);
router.put(
  "/update-subject",
  [jwtAuthentication],
  studentValidators.updateSubjectValidationRules,
  validate,
  studentControllers.updateSubject
);

module.exports = router;
