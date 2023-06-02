const express = require("express");
const { addCategories, showCategories , deleteCategory,updateCategory,singleCategory }  = require("../controllers/categoriesController")

const router = express.Router();
router.route("/all-category").get(showCategories);
router.route("/add-category").post(addCategories);
router.route("/:categoryId").delete(deleteCategory);
router.route("/:categoryId").put(updateCategory);
router.route("/:categoryId").get(singleCategory)
module.exports = router 