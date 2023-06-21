const express = require("express");
const {addToCart, getCartItems, removeFromCart } = require ("../controllers/cartController")
const router = express.Router()

router.route("/addToCart").post(addToCart)
router.route("/userId").get(getCartItems)
router.route("/cartItemId").delete(removeFromCart)

module.exports = router