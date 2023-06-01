const express = require("express");
const { registrationUser, showUser, deleteUser, updateUser,authUser ,singleUser} = require("../controllers/usersController")
const router = express.Router()

router.route("/register").post(registrationUser)
router.route("/login").post(authUser)
router.route("/all-users").get(showUser)
router.route("/:userId").get(singleUser)
router.route("/:userId").delete(deleteUser)
router.route("/:userId").put(updateUser)

module.exports = router