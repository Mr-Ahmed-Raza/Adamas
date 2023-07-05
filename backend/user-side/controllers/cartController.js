// const Cart = require("../models/CartModel")
const CartItem = require("../models/CartItemModel");
const mongoose = require('mongoose');

// Add a product to the cart
const addToCart = async (req, res) => {

  try {
    const { userId, productId, quantity } = req.body;

    // Check if the item already exists in the user's cart
    const existingItem = await CartItem.findOne({ userId, productId });

    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json({ message: 'Product quantity updated in cart.' });
    } else {
      // If the item doesn't exist, create a new cart item
      const newItem = new CartItem({ userId, productId, quantity });
      await newItem.save();
      res.status(201).json({ message: 'Product added to cart.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  // try {
  //   const { userId, productId, quantity } = req.body;

  //   // Check if the cart already exists for the user
  //   let cart = await Cart.findOne({ userId });

  //   // If the cart doesn't exist, create a new one
  //   if (!cart) {
  //     cart = new Cart({ userId, items: [] });
  //   }

  //   // Check if the product is already in the cart
  //   const existingCartItem = await CartItem.findOne({
  //     cartId: cart._id,
  //     productId,
  //   });

  //   if (existingCartItem) {
  //     // If the product already exists, update the quantity
  //     existingCartItem.quantity += quantity;
  //     await existingCartItem.save();
  //   } else {
  //     // If the product doesn't exist, create a new cart item
  //     const cartItem = new CartItem({ cartId: cart._id, productId, quantity });
  //     cart.items.push(cartItem);
  //   }

  //   await cart.save();
  //   res.status(200).json({ message: "Product added to cart successfully"});
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to add product to cart" });
  // }
};

// Get all cart items for a user
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params; 
    const cartItems = await CartItem.aggregate([
      {
        $match: {
          userId:new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: 'products', 
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $project: {
          _id: 0,
          productId: '$product._id',
          productName: '$product.title',
          productPicture: '$product.picture',
          productPrice: '$product.price',
          quantity: 1
        }
      }
    ]);

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }

  // try {
  //   const { userId } = req.body;

  //   const cartItems = await Cart.aggregate([
  //     { $match: { userId: mongoose.Types.ObjectId(userId) } },
  //     { $unwind: "$items" },
  //     {
  //       $lookup: {
  //         from: "cartitems",
  //         localField: "items",
  //         foreignField: "_id",
  //         as: "cartItemDetails",
  //       },
  //     },
  //     { $unwind: "$cartItemDetails" },
  //     {
  //       $lookup: {
  //         from: "products",
  //         localField: "cartItemDetails.productId",
  //         foreignField: "_id",
  //         as: "productDetails",
  //       },
  //     },
  //     { $unwind: "$productDetails" },
  //     {
  //       $group: {
  //         _id: "$_id",
  //         items: {
  //           $push: {
  //             _id: "$cartItemDetails._id",
  //             quantity: "$cartItemDetails.quantity",
  //             product: "$productDetails",
  //           },
  //         },
  //       },
  //     },
  //   ]);

  //   if (cartItems.length > 0) {
  //     res.status(200).json(cartItems[0].items);
  //   } else {
  //     res.status(404).json({ error: "Cart not found" });
  //   }
  // } catch (error) {
  //   res.status(500).json({ error:  "Failed to retrieve cart items" });
  // }
};


// Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const {itemId} = req.params;

    // Find and remove the cart item
    const removedItem = await CartItem.findByIdAndRemove(itemId);

    if (!removedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
  // try {
  //   const { cartItemId } = req.body;
  //   await CartItem.findByIdAndDelete(cartItemId);
  //   res.status(200).json({ message: "Product removed from cart successfully" });
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to remove product from cart" });
  // }
};

module.exports = { addToCart, getCartItems, removeFromCart };
   