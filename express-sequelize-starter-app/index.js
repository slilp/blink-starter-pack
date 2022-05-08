const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./src/models");
const dotenv = require("dotenv");
const routes = require("./src/routes");
const passport = require("./src/middlewares/passport");
const { errorHandler, logErrors } = require("./src/middlewares/error");

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.use(passport.initialize());

app.use("/api", routes);

app.get("/test", (req, res) => {
  res.json({ status: true, message: "your api running success 😃" });
});

app.use(logErrors);
app.use(errorHandler);

db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`error connection with db ${error}`);
  });
