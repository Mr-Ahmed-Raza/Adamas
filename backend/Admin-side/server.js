const express = require("express")
const dotenv = require("dotenv");
const connectDb = require("./database/connection");
const categoryRouter = require("./routes/categoriesRoute")
const productRouter = require("./routes/productRoute")
const app = express();
dotenv.config();
connectDb();
app.use(express.json()); // to access json data

app.get("/", (req, res) => {
  res.send("Api Running");
});

app.use("/api/Category", categoryRouter);
app.use("/api/Product", productRouter);



const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server is running on PORT ${PORT}...`)
);

