const asyncHandler = require("express-async-handler");
const product = require("../models/ProductsModel")

const addProducts = asyncHandler(async(req, res) => {
    try {
    const { title, description, price, featured, categories } = req.body
    const product_Deatails = await product.create({ title, description, price, featured, categories })
    res.status(200).json({message:"Product Add successfully" , product_Deatails})
        
    } catch (error) {
        res.status(400)
        throw new Error("Product not added" , error)
    }
})

const showProducts = asyncHandler(async (req, res) => {
    try {
        const show_product = await product.find()
        res.status(200).json(show_product)
    
  } catch (error) {
    res.status(400)
        throw new Error("Product not shown" , error)
  }  
    
})

const deleteProducts = asyncHandler(async (req, res) => {
    try {
        const {productId} = req.params
        console.log(productId);
        await product.findByIdAndDelete(productId)
        res.status(200).json({message:"deleted product sucessfully"})
        

    } catch (error) {
        throw new Error("Product not deleted" , error)

    }
    
})

const updateProducts = asyncHandler(async (req, res) => {
    try {
    const { productId } = req.params
    const { title, description, price, featured, categories } = req.body
    await product.findByIdAndUpdate(productId, { title, description, price, featured, categories }, { new: true })
    res.status(200).json({message:"Product updated"})
    
   } catch (error) {
    throw new Error("Product not updated" , error)

   }
    
})

module.exports= {addProducts ,showProducts ,deleteProducts,updateProducts }