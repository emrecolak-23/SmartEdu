const express = require("express");
const mongoose = require("mongoose");
const pageRouter = require("./routes/pageRoute");
const courseRouter = require("./routes/courseRoute");
const categoryRouter = require("./routes/categoryRoute");

const app = express();

// DB Connect
const dbURI =
  "mongodb+srv://emco:emco3232@nodetuts.iuulr.mongodb.net/smart-edu?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then((result) => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Routes
app.use('/',pageRouter);
app.use('/course',courseRouter);
app.use('/category',categoryRouter);

// Declare Port
const PORT = 11000;

app.listen(PORT, () => {
  console.log(`Server created in ${11000} port`);
});
