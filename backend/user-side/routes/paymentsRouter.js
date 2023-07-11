const express = require("express");
const { createPayments } = require("../controllers/paymentController")
const router = express.Router()

router.route("/payments").post(createPayments)
