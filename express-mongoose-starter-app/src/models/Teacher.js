const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    firstName: String,
    lastName: String,
    profileImage: String,
    subject: { type: mongoose.Types.ObjectId, ref: "subject" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("teacher", schema);
