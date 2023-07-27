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
const multer  = require('multer')
const app = express();
dotenv.config();
connectDb();
app.use(cors());
app.use(express.json()); // to access json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/img", express.static(path.join(__dirname, "../images")));

// setting up the image 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory for uploaded files
    cb(null, '../images');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });




app.get("/", (req, res) => {
  res.send("Api Running");
});
app.use("/api/users" , upload.single("picture"), userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user/order", orderRouter);
app.use("/api/user/payment", paymentRouter);




const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server is running on PORT ${PORT}...`)
);

