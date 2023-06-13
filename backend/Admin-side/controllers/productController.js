const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductsModel");
const product = require("../models/ProductsModel");

// Add Product 
// GET /api/admin/product/add-product
const addProducts = asyncHandler(async(req, res) => {
    try {
        const { title, description, price , selectedCategoryId,featured } = req.body
        const picture = req.file.filename
        console.log(req.body);
        console.log(req.file.filename);
    const product_Details = await Product.create({ title, description, price ,picture,featured,selectedCategoryId })
    res.status(200).json({message:"Product Add successfully" , product_Details})
     
    } catch (error) {
        res.status(400)
        throw new Error("Product not added" , error)
    }
})


// Show all Product 
// GET /api/admin/product/
const showProducts = asyncHandler(async (req, res) => {
    try {
      const product = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "selectedCategoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            picture: 1,
            price: 1,
            featured: 1,
            categoryTitle: "$category.title",
          },
        },
      ])
      .sort({createdAt: -1}).limit(10);
  
      res.status(200).json({ message: "Product list", product });
    } catch (error) {
      res.status(400);
      throw new Error("Error occurred... products could not be retrieved.");
    }
  });

  // Delete Product 
// GET /api/admin/product/:productId
const deleteProducts = asyncHandler(async (req, res) => {
    try {
        const {productId} = req.params
        console.log(productId);
        await Product.findByIdAndDelete(productId)
        res.status(200).json({message:"deleted product sucessfully"})
        

    } catch (error) {
        throw new Error("Product not deleted" , error)

    }
    
})

// Fetch featured products
// GET /api/admin/product/featured-products
const getFeaturedProducts =asyncHandler(async (req, res) => {
  try {
    const product = await Product.aggregate([
      {
        $match: { featured: 'Yes' },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
    ]);

    res.json({ message: "Featured Products ", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product 
// PUT /api/admin/product/:productId
const updateProducts = asyncHandler(async (req, res) => {
  const { title, description, price , selectedCategoryId,featured } = req.body
  const picture = req.file ? req.file.filename : undefined;
    const { productId } = req.params
  
    try {
        const product = await Product.findByIdAndUpdate(productId, { new: true });
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
  
      product.title = title;
      product.description = description;
      product.price = price;
      product.featured = featured;
      product.selectedCategoryId = selectedCategoryId;
      if (picture) {
        product.picture = picture;
      }
  
      const updatedProduct = await product.save();
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      res.status(400);
      throw new Error("Product not updated", error);
    }
});
  
// Get the selected product 
// GET /api/admin/product/:productId
const singleProduct = asyncHandler(async (req, res) => {
    try {
      const  {productId}  = req.params;
      const selectedProduct = await Product.findOne({ _id: productId })
        res.status(200).json({ meassge: "Selected product ", selectedProduct } );
    } catch (error) {
      res.status(400)
      throw new Error("Error occured while Selecting product...", error);
    }
  });

// const updateProducts = asyncHandler(async (req, res) => {
//     try {
//     const { productId } = req.params
//     const { title, description, price, featured, categories } = req.body
//     await Product.findByIdAndUpdate(productId, { title, description, price, featured, categories }, { new: true })
//     res.status(200).json({message:"Product updated"})
    
//    } catch (error) {
//     throw new Error("Product not updated" , error)

//    }
    
// })

module.exports= {addProducts ,showProducts ,getFeaturedProducts, deleteProducts,updateProducts,singleProduct }