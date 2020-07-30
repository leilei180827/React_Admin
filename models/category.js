const mongoose = require("mongoose");
// const router = require("../routes/register");
const Schema = mongoose.Schema;
const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Category", Category);
