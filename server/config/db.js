const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);
// MONGO_URI =
//   "mongodb+srv://first-user:4sSBEFDzuDBXSrIN@cluster0.nbktbxi.mongodb.net/";

mongoose
  .connect(process.env.MONGO_URI)
  // .connect(MONGO_URI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error(err));

module.exports = mongoose.connection;
