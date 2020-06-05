const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require("express-jwt");
const path = require("path");
const port = process.env.PORT || 5000;
const secret = process.env.SECRET || "cheese pizza crazy";

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/user-authentication",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to the DB")
);
app.use("/author", require("./routes/authorRouter.js"));
app.use("/api", expressJwt({ secret: process.env.SECRET }));
app.use("/api/transaction", require("./routes/transactionRouter.js"));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

port(9000, () => {
  console.log("Server is running on local port 9000");
});
