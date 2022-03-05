const express = require("express");

const app = express();

// Route
app.get("/", (req, res) => {
  res.send("Index Sayfası");
});

// Declare Port
const PORT = 11000;

app.listen(PORT, () => {
  console.log(`Server created in ${11000} port`);
});
