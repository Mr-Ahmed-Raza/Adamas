const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const adminUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    
    
})

//Compare  both passwords
adminUserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
// User ko save karn sa phla call hoga : pre mean before saving anything 

adminUserSchema.pre("save", async function (next) {
    // Agr password modified nhi hua hoga then moves to the next
    if (!this.isModified) {
      next();
    }
    // than modifies a password into to bcrypt form
  
    const salt = await bcrypt.genSalt(10);
    // convert the bcrypted passowrd into hash 
    this.password = await bcrypt.hash(this.password, salt);
  })




const adminUser = mongoose.model("adminUser", adminUserSchema)
module.exports = adminUser