const Payment = require("../models/Payment");
const asyncHandler = require("express-async-handler");
const axios = require('axios');
// Create a new payment

const createPayments = asyncHandler(async (req, res) => {
  try {
    const { amount, cardNumber, expiryMonth, expiryYear, cvv } = req.body;
    
    // Make an API request to PayPro to process the payment
    const response = await axios.post('https://payproapi.example.com/process-payment', {
      amount,
      name,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      merchantId: 'rkSkN9OT8FCHX1z',
      apiKey: '4g00hgCBur6UFPj',
      // Additional parameters required by PayPro API
    });
    
    // Handle the response from PayPro
    if (response.data.success) {
      // Payment successful
      res.json({ success: true, message: 'Payment successful' });
    } else {
      // Payment failed
      res.status(400).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});
  

module.exports = {createPayments}