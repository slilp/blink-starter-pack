const dotenv = require("dotenv");
const HeaderAPIKeyStrategy =
  require("passport-headerapikey").HeaderAPIKeyStrategy;

dotenv.config();

var opts = { header: "Api-Key", prefix: "" };

module.exports = new HeaderAPIKeyStrategy(opts, false, function (apikey, done) {
  if (apikey === process.env.API_KEY) {
    return done(null, true);
  } else {
    return done(null, false);
  }
});
