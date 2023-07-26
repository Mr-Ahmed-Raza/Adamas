const express = require("express")
const path = require('path');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require("./database/connection");
const categoryRouter = require("./routes/categoriesRoute")
const productRouter = require("./routes/productRoute")
const adminUserRouter = require("./routes/adminUserRoute")
const http = require('http'); // Import the http module
const socketIO = require('socket.io'); // Import the socket.io module
const Product = require("./models/ProductsModel");
const multer  = require('multer')
const app = express();
dotenv.config();
connectDb();
app.use(cors());
app.use(express.json()); // to access json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/img", express.static(path.join(__dirname, "../images")));
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.originalname + "_"  + uniqueSuffix)
//   }
// })
// const upload = multer({ storage: storage })
// const rootDirectory = path.resolve(__dirname);
// console.log('Root Directory:', rootDirectory);

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
app.use("/api/admin/category", upload.single("picture"), categoryRouter);
app.use("/api/admin/product",upload.single("picture") , productRouter);
app.use("/api/admin/", adminUserRouter);


// Search Products by title
const getSearchProduct = async (searchQuery) => {
  try {
    // Use a regular expression to perform a case-insensitive search for the product title
    const searchResults = await Product.find({
      title: { $regex: new RegExp(searchQuery, "i") },
    });
    return searchResults;
  } catch (error) {
    console.error(error);
    throw new Error("Error occurred... products could not be retrieved.");
  }
};

// socket io 
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("User connected");

  // Handle search queries
  socket.on("searchProduct", async (searchQuery) => {
    try {
      const searchResults = await getSearchProduct(searchQuery);
      socket.emit("searchResults", searchResults);
    } catch (error) {
      console.error(error);
      socket.emit("searchError");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});



const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server is running on PORT ${PORT}...`)
);