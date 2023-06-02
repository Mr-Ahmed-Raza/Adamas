const express = require("express");
const { registrationAdminUser, authAdminUser } = require("../controllers/adminUserController");

const router = express.Router()

router.route("/register").post(registrationAdminUser)
router.route("/login").post(authAdminUser)

module.exports = router