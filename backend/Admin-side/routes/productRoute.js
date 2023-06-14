const express = require("express")

const { addProducts, showAllProducts, deleteProducts, updateProducts,singleProduct,getFeaturedProducts,latestProducts } = require("../controllers/productController")
const router = express.Router()

router.route("/add-product").post(addProducts)
router.route("/").get(showAllProducts)
router.route("/feature-products").get(getFeaturedProducts)
router.route("/latest-arrivals").get(latestProducts)
router.route("/:productId").get(singleProduct)
router.route("/:productId").delete(deleteProducts)
router.route("/:productId").put(updateProducts)





module.exports = router