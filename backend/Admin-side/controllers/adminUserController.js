const asyncHandler = require("express-async-handler");
const AdminUser = require("../models/adminUserModel")
const genrateToken = require("../database/genrateToken");

// Register a new user :
// api: POST /api/admin/register

const registrationAdminUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body;
  console.log("Registeration Data: ",req.body);
    if (!email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await AdminUser.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await AdminUser.create({
      email,
      password,
    });
  
    if (user) {
      res.status(201).json({meaasage:"Register successfull" , 
        _id: user._id,
        email: user.email,
       token: genrateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });

// Login  :
// api: POST /api/admin/login
const authAdminUser = asyncHandler(async (req, res) => {
    const {email ,password} = req.body
    const user = await AdminUser.findOne({email})

    const check = await user.matchPassword(password);
  console.log(check);
  if (check) {
    res.json({message:"Login sucessfull"});
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
      

  module.exports = {registrationAdminUser , authAdminUser}