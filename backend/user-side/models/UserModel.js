const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true
    }
    
})

//Compare  both passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
// User ko save karn sa phla call hoga : pre mean before saving anything 

userSchema.pre("save", async function (next) {
    // Agr password modified nhi hua hoga then moves to the next
    if (!this.isModified) {
      next();
    }
    // than modifies a password into to bcrypt form
  
    const salt = await bcrypt.genSalt(10);
    // convert the bcrypted passowrd into hash 
    this.password = await bcrypt.hash(this.password, salt);
  })


const user = mongoose.model("user", userSchema)
module.exports = user