const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    cardNo: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    level: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("card", schema);
