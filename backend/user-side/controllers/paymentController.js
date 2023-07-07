const Payment = require("../models/Payment");

// Create a new payment
exports.createPayment = (req, res) => {
  const { fullName, mobileNumber, contactNumber } = req.body;

  const payment = new Payment({
    userId: req.user.id,
    fullName,
    mobileNumber,
    contactNumber,
  });

  payment.save((err, payment) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to create payment",
      });
    }
    res.json(payment);
  });
};
