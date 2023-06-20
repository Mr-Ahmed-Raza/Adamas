const Cart = require("../models/CartModel")
const CartItem = require("../models/CartItemModel");

// Add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ userId });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingCartItem = await CartItem.findOne({
      cartId: cart._id,
      productId,
    });

    if (existingCartItem) {
      // If the product already exists, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // If the product doesn't exist, create a new cart item
      const cartItem = new CartItem({ cartId: cart._id, productId, quantity });
      cart.items.push(cartItem);
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Get the cart items for a user
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId }).populate("items");
    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart items" });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.body;
    await CartItem.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};

module.exports = { addToCart, getCartItems, removeFromCart };
