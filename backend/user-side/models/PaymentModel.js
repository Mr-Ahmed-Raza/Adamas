const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  totalPayment: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiryMonth: {
    type: Number,
    required: true,
  },
  expiryYear: {
    type: Number,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
