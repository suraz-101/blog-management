require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./Route/route");
const mongoose = require("mongoose");

const app = express();
const apiVersion = "api/v1";

mongoose.connect(process.env.DB).then(() => {
  console.log("database connected successfully");
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static("/public"));
app.use(`/${apiVersion}`, router);

app.use((error, req, res, next) => {
  const err = error ? error.toString() : "something went wrong";
  res.status(500).json({ message: err });
});

app.listen(process.env.PORT, () => {
  console.log(`The server is running at http://localhost:${process.env.PORT}`);
});
