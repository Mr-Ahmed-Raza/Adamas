const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
  status: {
    type: String,
    enum: ["active", "completed" , "pending"],
    default: "active",
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
