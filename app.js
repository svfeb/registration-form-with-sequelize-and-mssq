const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
var path = require("path");
var flash = require("express-flash");
const router = require("./routes/userRouter");
require("dotenv").config();
require("./models/model");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(flash());

app.get("/", (req, res) => {
  res.json({ message: "The Boys" });
});
app.use("/auth", router);
app.use("/api/v1", router);

module.exports = app;
