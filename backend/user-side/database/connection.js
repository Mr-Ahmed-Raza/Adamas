const mongoose = require("mongoose");



const connectDb = async () => {
    try {
      const con = await mongoose.connect("mongodb://127.0.0.1:27017/Adamas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
      })
        console.log("Connection Success");
        
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDb