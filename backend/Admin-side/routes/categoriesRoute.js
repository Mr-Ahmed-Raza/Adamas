const express = require("express");
const { addCategories, showCategories , deleteCategory,updateCategory }  = require("../controllers/categoriesController")

const router = express.Router();
router.route("/").get(showCategories);
router.route("/add-category").post(addCategories);
router.route("/:categoryId").delete(deleteCategory);
router.route("/:categoryId").put(updateCategory);

module.exports = router 