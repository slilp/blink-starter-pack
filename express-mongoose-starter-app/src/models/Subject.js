const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    credit: { type: Number, default: 0 },
    students: [{ type: mongoose.Types.ObjectId, ref: "student" }],
    teachers: [{ type: mongoose.Types.ObjectId, ref: "teacher" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subject", schema);
