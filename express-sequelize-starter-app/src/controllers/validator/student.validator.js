const { body, validationResult } = require("express-validator");

module.exports = {
  registerValidationRules: [
    body("username").isEmail(),
    body("password").notEmpty(),
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
  ],
  loginValidationRules: [
    body("username").isEmail(),
    body("password").notEmpty(),
  ],
  addSubjectValidationRules: [body("subjectId").isInt()],
  updateSubjectValidationRules: [
    body("subjectId").notEmpty(),
    body("newSubjectId").notEmpty(),
  ],
};
