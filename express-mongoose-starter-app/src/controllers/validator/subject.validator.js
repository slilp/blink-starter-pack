const { body, validationResult } = require("express-validator");

module.exports = {
  createValidationRules: [
    body("name").notEmpty(),
    body("credit").isInt({ min: 0, max: 6 }),
  ],
  updateValidationRules: [
    body("name").optional(),
    body("credit").optional().isInt({ min: 0, max: 6 }),
  ],
  updateGradeOfStudentValidationRules: [
    body("studentId").isInt(),
    body("subjectId").isInt(),
    body("grade").isIn(["A", "B", "C", "D", "F"]),
  ],
};
