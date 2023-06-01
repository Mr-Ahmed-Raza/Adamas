const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
       
    },
    description: {
        type: String, 
        required: true ,
    },
    Image: {
        type: String, 
        
    }
    
})
const categories = mongoose.model("categories", categoriesSchema)
module.exports = categories