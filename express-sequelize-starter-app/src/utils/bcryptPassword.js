const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashResult = await bcrypt.hash(password, salt);
    return hashResult;
  },
  verifyPassword: async (passwordVerify, hashPassword) => {
    const isCorrectPassword = await bcrypt.compareSync(
      passwordVerify,
      hashPassword
    );
    return isCorrectPassword;
  },
};
