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
  picture: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  selectedCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories._id",
    require: true,
  },
}
,{ timestamps: true }
);

const product = mongoose.model("product", productSchema);
module.exports = product;
