const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "visitor",
    },
    portrait: {
      type: String,
    },
    phone_number: String,
    email: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", User);
