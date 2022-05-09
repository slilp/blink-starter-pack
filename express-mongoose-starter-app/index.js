const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./src/routes");
const passport = require("./src/middlewares/passport");
const { errorHandler, logErrors } = require("./src/middlewares/error");

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const connectionString = process.env.DB_CONNECTION || "";

app.use(passport.initialize());

app.use("/api", routes);

app.get("/test", (req, res) => {
  res.json({ status: true, message: "your api running success 😃" });
});

app.use(logErrors);
app.use(errorHandler);

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log(`error connect db : ${err}`);
    } else {
      app.listen(port, () => {
        console.log(`app running port ${port}`);
      });
    }
  }
);
