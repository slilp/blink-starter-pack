const { body, validationResult } = require("express-validator");

module.exports = {
  updateValidationRules: [
    body("gender").optional().isIn(["male", "female", "other"]),
  ],
};
