// const mongoose = require('mongoose');
// const path = require('path');
// const app = require('./server');


// require("dotenv").config({path: path.join(__dirname, '../.env')});

// const port = process.env.PORT || 3000;
// const DB_URL = process.env.DB_URL;

// mongoose.connect(DB_URL)
//     .then(() => console.log("Connected to databse"))
//     .catch(console.error)

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// })

const app = require("./app.js");
const connection = require("./config/db.js");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
connection.once("open", () => {
  app.listen(3000, () => console.log("http://localhost:3000"));
});