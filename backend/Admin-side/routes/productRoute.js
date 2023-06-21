const express = require("express")

const { addProducts, showAllProducts, deleteProducts, updateProducts,singleProduct,getFeaturedProducts,latestProducts,recentProducts,getRecommendedProducts,sliderecentProducts } = require("../controllers/productController")
const router = express.Router()

router.route("/add-product").post(addProducts)
router.route("/").get(showAllProducts)
router.route("/feature-products").get(getFeaturedProducts)
router.route("/latest-arrivals").get(latestProducts)
router.route("/recent-products").get(recentProducts)
router.route(`/:productId`).delete(deleteProducts)
router.route(`/:productId`).put(updateProducts)
router.route(`/recommended/:ProductId`).get(getRecommendedProducts)
router.route("/sliderecent-product").get(sliderecentProducts)
router.route(`/:selectedproductId`).get(singleProduct)






module.exports = router