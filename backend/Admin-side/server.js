const express = require("express")
const path = require('path');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require("./database/connection");
const categoryRouter = require("./routes/categoriesRoute")
const productRouter = require("./routes/productRoute")
const adminUserRouter = require("./routes/adminUserRoute")
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




const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server is running on PORT ${PORT}...`)
);

