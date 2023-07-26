const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
}
  , { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
