const passport = require("passport");

module.exports.jwtAuthentication = passport.authenticate("jwt", {
  session: false,
});

module.exports.apiKeyAuthentication = passport.authenticate("headerapikey", {
  session: false,
  option: false,
});
