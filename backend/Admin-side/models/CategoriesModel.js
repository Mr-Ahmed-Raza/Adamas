const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
       
    },
    description: {
        type: String, 
        required: true ,
    },
    Image: {
        type: String, 
        
    },
    status: {
        type: Boolean, 
        default:true
    }
})
const categories = mongoose.model("categories", categoriesSchema)
module.exports = categories