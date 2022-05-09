const jwt = require("jsonwebtoken");

module.exports = {
  accessTokenGenerator: (userId) => {
    const payload = {
      userId: userId,
    };

    const privateKey = process.env.ACCESS_KEY || "";

    return jwt.sign(payload, privateKey, { expiresIn: 3600 });
  },
};
