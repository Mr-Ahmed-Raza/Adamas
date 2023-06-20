const asyncHandler = require("express-async-handler");
const categories = require("../models/CategoriesModel")


// Show all category  
// GET /api/admin/category/all-categories
const showCategories = asyncHandler(async (req, res) => {
    
    try {
        const category = await categories.find()
        res.status(201).json({ message: "Category list", category })
        
    } catch (error) {
        res.status(400)
        throw new Error("Error occured... Categories chould not reterived...")
    }
})
// Show only 6 in reverse order category  
// GET /api/admin/category/reverse-categories



module.exports = {showCategories}