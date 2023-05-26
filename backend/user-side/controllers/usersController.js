const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const genrateToken = require("../database/genrateToken");


// Register a new user :
// api: POST /api/user/register-user
const registrationUser = asyncHandler(async (req, res) => {
  const { firstName, email, password } = req.body;

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
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
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
  // Find to user already exists or not
  const user = await User.findOne({ email });
  // Condition to check the user email and password to give user login access
  // Check the whether users enter email and passoword are matched or not
  const check = await user.matchPassword(password);
  console.log(check);
  if (check) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genrateToken(user._id),          
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const showUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ meassge: "All users ", users });
  } catch (error) {
    res.status(400)
    throw new Error("Error occured users not being showed...", error);
  }
});

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

const updateUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params
        const { email, firstfirstName, password } = req.body;
        const updated_User = await User.findByIdAndUpdate(userId ,{ email, firstfirstName, password } , {new:true} )
        res.status(200).json({message:"User updated." , updated_User})
      
    }
    catch (error) {
        res.status(400)
    throw new Error("Error occured user not updated", error);
  }
});

module.exports = { registrationUser, showUser, deleteUser, updateUser, authUser };