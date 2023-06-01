const asyncHandler = require("express-async-handler");
const categories = require("../models/CategoriesModel")

const addCategories = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const image  = req.file
    console.log(req.body);

    // Validation checks if the user is not entering required field data
    if (!title && ! description) {
        res.status(400)
        throw new Error ("Please fill all the required field")
    }
   // to check the enter product is already exists 
    const existingcategorey = await categories.findOne({ title })
    if (existingcategorey) {
        res.status(400)
        throw new Error("Category with same title is already exists")
    }

    const Category = await categories.create({
        title, 
        description,
        image,
    })
    if (Category) {
        res.status(201).json(Category)
    }
    
    
})

const showCategories = asyncHandler(async (req, res) => {
    
    try {
        const category = await categories.find()
        res.status(201).json(category)
        
    } catch (error) {
        res.status(400)
        throw new Error("Error occured... Categories chould not reterived...")
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const {categoryId} = req.params
        console.log(categoryId);
        await categories.findByIdAndDelete(categoryId)
        res.status(200).json({message:"deleted sucessed"})

    } catch (error) {
        
        res.status(500).json({ error: 'Failed to delete category'});    }
})

const updateCategory = asyncHandler(async(req, res) => {
    const { categoryId } = req.params 
    const { title, description } = req.body
    const image  = req.file
    const category = await categories.findByIdAndUpdate(categoryId, {title , description , image}, { new: true })
    res.status(200).json({message: "Successfully update the category",category})


})

module.exports = {addCategories, showCategories ,deleteCategory ,updateCategory}