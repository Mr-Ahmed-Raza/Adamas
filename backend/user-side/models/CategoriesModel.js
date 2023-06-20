const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
       
    },
    description: {
        type: String,
        required: true,
    }
    ,
    picture: {
        type: String,   
    },
   
  },
    { timestamps: true }
)
const categories = mongoose.model("categories", categoriesSchema)
module.exports = categories