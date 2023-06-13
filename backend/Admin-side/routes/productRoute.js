const express = require("express")

const { addProducts, showProducts, deleteProducts, updateProducts,singleProduct,getFeaturedProducts } = require("../controllers/productController")
const router = express.Router()

router.route("/add-product").post(addProducts)
router.route("/").get(showProducts)
router.route("/feature-products").get(showProducts)
router.route("/:productId").get(singleProduct)
router.route("/:productId").delete(deleteProducts)
router.route("/:productId").put(updateProducts)





module.exports = router