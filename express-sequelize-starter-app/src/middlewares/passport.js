const passport = require("passport");
const jwt = require("./jwt");
const apikey = require("./apikey");

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(jwt);
passport.use(apikey);

module.exports = passport;
