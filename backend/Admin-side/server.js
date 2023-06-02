const express = require("express")
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require("./database/connection");
const categoryRouter = require("./routes/categoriesRoute")
const productRouter = require("./routes/productRoute")
const adminUserRouter = require("./routes/adminUserRoute")
const app = express();
dotenv.config();
connectDb();
app.use(cors());
app.use(express.json()); // to access json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Api Running");
});

app.use("/api/admin/category", categoryRouter);
app.use("/api/admin/product", productRouter);
app.use("/api/admin/", adminUserRouter);




const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server is running on PORT ${PORT}...`)
);

