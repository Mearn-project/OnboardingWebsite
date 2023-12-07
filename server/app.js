const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const HRRouter = require("./routes/HRRouter.js");
const UserRouter = require("./routes/UserRouter.js");
const app = express();

// enable cors
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true, // enable cookies for cors
  })
);
// enable cookies for express
app.use(cookieParser());
// enable json and urlencoded for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enable morgan for logging
app.use(morgan(":method :url :status :response-time ms"));
// enable static files
app.use(express.static("views"));
app.use("/api/user", UserRouter);
app.use("/api/HR", HRRouter);
app.all("*", (_req, res) => {
  return res.status(404).json({ message: "Page Not Found" });
});

module.exports = app;
