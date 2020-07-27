const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleId: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", User);
