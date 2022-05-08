const dotenv = require("dotenv");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
dotenv.config();

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_KEY,
};

module.exports = new JwtStrategy(opts, async function (jwt_payload, done) {
  const { userId } = jwt_payload;
  if (userId) {
    return done(null, userId);
  } else {
    return done(null, false);
  }
});
