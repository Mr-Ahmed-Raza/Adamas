const express = require("express");
const { addToCart, getCartItems, removeFromCart, getselectedCartItem } = require("../controllers/cartController")
const {createOrder} =require ("../controllers/orderController")
const router = express.Router()

router.route("/addToCart").post(addToCart)
router.route("/cartItemsByUser/:userId").get(getCartItems)
router.route("/removeCartItem/:itemId").delete(removeFromCart)
router.route("/selectedCartItem/:itemId").get(getselectedCartItem)



module.exports = router