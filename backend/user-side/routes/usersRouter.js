const express = require("express");
const { registrationUser, showUser, deleteUser, updateUser,authUser} = require("../controllers/usersController")

const router = express.Router()

router.route("/register-user").post(registrationUser)
router.route("/").get(showUser)
router.route("/:userId").delete(deleteUser)
router.route("/:userId").put(updateUser)
router.route("/login-user").post(authUser)

module.exports = router