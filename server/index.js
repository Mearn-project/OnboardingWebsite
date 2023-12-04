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
