const asyncHandler = require("express-async-handler");
const categories = require("../models/CategoriesModel")

// Add category  
// POST /api/admin/category/add-category
const addCategories = asyncHandler(async (req, res) => {
    const { title, description } = req.body
     const picture = req.file.filename
    console.log(req.body);
    console.log(req.file);

    // Validation checks if the user is not entering required field data
    if (!title && ! description && !picture) {
        res.status(400)
        throw new Error ("Please fill all the required field")
    }
   // to check the enter category is already exists 
    const existingcategorey = await categories.findOne({ title })
    if (existingcategorey) {
        res.status(400)
        throw new Error("Category with same title is already exists")
    }

    const Category = await categories.create({
        title, 
        description,
        picture
    })
    if (Category) {
        res.status(201).json(Category)
    }
    
    
})
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
const showCategoriesReverse = asyncHandler(async (req, res) => {
    
    try {
        const category = await categories.find().sort({createdAt: -1}).limit(6)
        res.status(201).json({ message: "Category list", category })
        
    } catch (error) {
        res.status(400)
        throw new Error("Error occured... Categories chould not reterived...")
    }
})
// Delate category  
// DELETE /api/admin/category/:categoryId
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const {categoryId} = req.params
        console.log(categoryId);
        await categories.findByIdAndDelete(categoryId)
        res.status(200).json({message:"deleted sucessed"})

    } catch (error) {
        
        res.status(500).json({ error: 'Failed to delete category'});    }
})
// Update category
// PUT /api/admin/category/:categoryId
// const updateCategory = asyncHandler(async (req, res) => {
//     const { categoryId } = req.params;
//     const { title, description } = req.body;
//     const picture = req.file;
//     let picturePath = null;
  
//     if (picture) {
//       // If a new picture is provided, update the picturePath
//       picturePath = picture.path;
//     }
  
//     const category = await categories.findByIdAndUpdate(
//       categoryId,
//       { title, description, picturePath },
//       { new: true }
//     );
  
//     res.status(200).json({ message: "Successfully updated the category", category });
//     console.log(category);
//   });

const updateCategory = asyncHandler(async (req, res) => {
  const { title, description} = req.body;
  const picture = req.file ? req.file.filename : undefined;
  const { categoryId } = req.params

  try {
      const category = await categories.findByIdAndUpdate(categoryId, { new: true });
    if (!category) {
      res.status(404);
      throw new Error("category not found");
    }

    category.title = title;
    category.description = description;
    if (picture) {
      category.picture = picture;
    }

    const updatedcategory = await category.save();
    res.status(200).json({ message: "category updated successfully", category: updatedcategory });
  } catch (error) {
    res.status(400);
    throw new Error("category not updated", error);
  }
});
  
// Get the selected category  
// GET /api/admin/category/:categoryId
const singleCategory = asyncHandler(async (req, res) => {
    try {
      const  {categoryId}  = req.params;
      const selectedcategory = await categories.findOne({ _id: categoryId })
        res.status(200).json({ meassge: "Selected Category ", selectedcategory } );
    } catch (error) {
      res.status(400)
      throw new Error("Error occured while Selecting category...", error);
    }
  });
  

module.exports = {addCategories, showCategories, showCategoriesReverse ,deleteCategory ,updateCategory,singleCategory, }