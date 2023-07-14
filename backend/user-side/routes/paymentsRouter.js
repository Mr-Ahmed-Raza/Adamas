const express = require("express");
const { createPayments,requestPayments,createCustomer, addNewCard , createCharges} = require("../controllers/paymentController")
const router = express.Router()

router.route("/create-payments").post(createPayments)
router.route("/request-payments").post(requestPayments)
router.route("/create-customer").post(createCustomer)
router.route("/add-card").post(addNewCard)
router.route("/create-charges").post(createCharges)


module.exports = router