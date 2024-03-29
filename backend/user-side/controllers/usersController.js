const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const genrateToken = require("../database/genrateToken");
const Cart = require("../models/CartModel");

// Register a new user :
// api: POST /api/user/register-user
const registrationUser = asyncHandler(async (req, res) => {
  const { firstName, email, password } = req.body;
  const picture = req.file ? req.file.filename : null;
console.log("Registeration Data: ",req.body);
  if (!firstName || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    firstName,
    email,
    password,
    picture
  });
   
  await user.save();
  
  if (user) {
    res.status(201).json({message:"User Registered",
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      picture:user.picture,
     token: genrateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Auth the User  / Login
// POST /api/user/login

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("email: ",email)
  console.log("password: ",password)
  // Find if the user already exists or not
  const user = await User.findOne({ email });
  console.log("User" , user);

  if (user) {
    // Check if the entered password matches the stored password
    const isPasswordMatched = await user.matchPassword(password);

    if (isPasswordMatched) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        token: genrateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;
  console.log("reset token:", resetToken);
  console.log("new password:" , newPassword);

  // Find the user with the reset token
  const user = await User.findOne({ resetToken });
  console.log(user);

  if (!user) {
    res.status(404);
    throw new Error("Invalid or expired reset token");
  }

  // Update the user's password
  user.password = newPassword;
  user.resetToken = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
});

// Add the reset password route to your Express app
// app.post("/api/user/reset-password", resetPassword);



// show all the User  
// GET /api/user/all-users
const showUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json({ meassge: "All users ", users });
  } catch (error) {
    res.status(400)
    throw new Error("Error occured users not being showed...", error);
  }
});

// Get the selected User  
// GET /api/user/:userId
const singleUser = asyncHandler(async (req, res) => {
  try {
    const  {userId}  = req.params;
    const selectedUser = await User.findOne({ _id: userId })
    res.status(200).json({ meassge: "Selected User ", selectedUser });
  } catch (error) {
    res.status(400)
    throw new Error("Error occured Selecteduser not being showed...", error);
  }
});

// Delete the selected User  
// DELETE /api/user/:userId
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "selected user is deleted" });
  } catch (error) {
    res.status(400)
    throw new Error("Error occured user not deleted", error);
  }
});

// update the selected User  
// PUT /api/user/:userId
const updateUser = asyncHandler(async (req, res) => {
    try {
      const { userId } = req.params;
        let payload = req.body;
        const updated_User = await User.findByIdAndUpdate(userId ,payload , {new:true} )
        res.status(200).json({message:"User updated." , updated_User})
      
    }
    catch (error) {
        res.status(400)
    throw new Error("Error occured user not updated", error);
  }
});


module.exports = { registrationUser, showUser, deleteUser, updateUser, authUser ,singleUser , resetPassword };
