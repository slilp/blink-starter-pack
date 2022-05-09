const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    card: { type: mongoose.Types.ObjectId, ref: "card" },
    subjects: [{ type: mongoose.Types.ObjectId, ref: "subject" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student", schema);
