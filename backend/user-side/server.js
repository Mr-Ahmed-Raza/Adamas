const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require("./database/connection");
const userRouter = require("./routes/usersRouter")
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

const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server is running on PORT ${PORT}...`)
);

