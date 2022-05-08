const { body, validationResult } = require("express-validator");

module.exports = {
  createValidationRules: [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
  ],
};
