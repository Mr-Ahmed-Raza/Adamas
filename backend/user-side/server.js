const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./database/connection");
const userRouter = require("./routes/usersRouter")
const app = express();
dotenv.config();
connectDb();
app.use(express.json()); // to access json data

app.get("/", (req, res) => {
  res.send("Api Running");
});

app.use("/api/Users", userRouter);

const PORT = process.env.PORT;

app.listen(PORT,console.log(`Server is running on PORT ${PORT}...`)
);

