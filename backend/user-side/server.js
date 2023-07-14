const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require("./database/connection");
const userRouter = require("./routes/usersRouter")
const cartRouter = require("./routes/cartRouter")
const orderRouter = require('./routes/orderRouter')
const paymentRouter = require('./routes/paymentsRouter')
const app = express();
dotenv.config();
connectDb();
app.use(cors());
app.use(express.json()); // to access json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/img", express.static(path.join(__dirname, "../images")));
app.get("/", (req, res) => {
  res.send("Api Running");
});

app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user/order", orderRouter);
app.use("/api/user/payment", paymentRouter);




const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server is running on PORT ${PORT}...`)
);

