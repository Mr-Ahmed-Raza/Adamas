const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: true,
  },
  categories: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories._id",
    },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
