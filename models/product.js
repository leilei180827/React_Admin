const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    keywords: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    inventory: {
      type: Number,
      required: true,
      default: 3,
    },
    category: {
      type: String,
      required: true,
    },
    pCategory: {
      type: String,
      required: true,
    },
    images: [{ name: String, url: String }],
    description: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", Product);
