const Order = require("../models/OrderModel");

// Create a new order
const createOrder = async (req, res) => {
  const { userId, products } = req.body;

  // Calculate the total payment
  const totalPayment = products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  const order = new Order({
    userId,
    products,
    totalPayment,
  });

  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to create order",
      }); 
    }
    res.json(order);
  });
};



module.exports = { createOrder };
