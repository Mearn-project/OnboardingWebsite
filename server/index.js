const mongoose = require('mongoose');
const path = require('path');
const app = require('./server');


require("dotenv").config({path: path.join(__dirname, '../.env')});

const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
    .then(() => console.log("Connected to databse"))
    .catch(console.error)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})