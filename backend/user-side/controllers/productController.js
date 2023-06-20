const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductsModel");


// Add Product
// GET /api/admin/product/add-product
const addProducts = asyncHandler(async (req, res) => {
  try {
    const { title, description, price, selectedCategoryId, featured } =
      req.body;
    const picture = req.file.filename;
    console.log(req.body);
    console.log(req.file.filename);
    const product_Details = await Product.create({
      title,
      description,
      price,
      picture,
      featured,
      selectedCategoryId,
    });
    res
      .status(200)
      .json({ message: "Product Add successfully", product_Details });
  } catch (error) {
    res.status(400);
    throw new Error("Product not added", error);
  }
});

// Show all Product
// GET /api/admin/product/
const showAllProducts = asyncHandler(async (req, res) => {
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
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
      },
      
    ]);

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
    const { productId } = req.params;
    console.log(productId);
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "deleted product sucessfully" });
  } catch (error) {
    throw new Error("Product not deleted", error);
  }
});

// Fetch featured products
// GET /api/admin/product/featured-products
const getFeaturedProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.aggregate([
      {
        $match: { featured: "Yes" },
      },
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
          createdAt: 1,
        },
      },
    ]);

    res.json({ message: "Featured Products", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch latest Arrivals
// GET  /api/admin/product/latest-arrivals
const latestProducts = asyncHandler(async (req, res) => {
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
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
      },
      {
        $limit: 12, // Limit the result to 10 documents
      },
    ]);

    res.status(200).json({ message: "Latest Product ", product });
  } catch (error) {
    res.status(400);
    throw new Error("Error occurred... products could not be retrieved.");
  }
});

// Fetch Recent products
// GET  /api/admin/product/recent-products
const recentProducts = asyncHandler(async (req, res) => {
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
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
      },
      {
        $limit: 2, // Limit the result to 2 documents
      },
    ]);

    res.status(200).json({ message: "Recent Products ", product });
  } catch (error) {
    res.status(400);
    throw new Error("Error occurred... products could not be retrieved.");
  }
});

// Update product
// PUT /api/admin/product/:productId
const updateProducts = asyncHandler(async (req, res) => {
  const { title, description, price, selectedCategoryId, featured } = req.body;
  const picture = req.file ? req.file.filename : undefined;
  const { productId } = req.params;

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
    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    res.status(400);
    throw new Error("Product not updated", error);
  }
});

// Get the selected product
// GET /api/admin/product/:productId
const singleProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const selectedProduct = await Product.findOne({ _id: productId });
    res.status(200).json({ meassge: "Selected product ", selectedProduct });
  } catch (error) {
    res.status(400);
    throw new Error("Error occured while Selecting product...", error);
  }
});

// Get Recommended Products
// GET /api/admin/product/recommended/:ProductId
const getRecommendedProducts = asyncHandler(async (req, res) => {
  try {
    const { ProductId } = req.params;

    // Fetch the selected product to get its category
    const selectedProduct = await Product.findById(ProductId);
    if (!selectedProduct) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Fetch recommended products based on the selected product's category
    const recommendedProducts = await Product.aggregate([
      {
        $match: { selectedCategoryId: selectedProduct.selectedCategoryId, _id: { $ne: selectedProduct._id } },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'selectedCategoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          picture: 1,
          price: 1,
          featured: 1,
          categoryTitle: '$category.title',
          createdAt: 1,
        },
      },
      {
        $limit: 4, // Adjust the number of recommended products as per your requirement
      },
    ]);

    res.status(200).json({ message: 'Recommended Products', recommendedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = {
  addProducts,
  showAllProducts,
  getFeaturedProducts,
  latestProducts,
  recentProducts,
  deleteProducts,
  updateProducts,
  singleProduct,
  getRecommendedProducts
};

