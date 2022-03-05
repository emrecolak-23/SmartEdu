const express = require("express");
const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Route
app.get("/", (req, res) => {
  res.status(200).render('index',{
    page_name:'index'
  });
});

app.get("/about", (req,res)=>{
  res.status(200).render('about',{
    page_name:'about'
  });
});

// Declare Port
const PORT = 11000;

app.listen(PORT, () => {
  console.log(`Server created in ${11000} port`);
});
