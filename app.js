const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const pageRouter = require("./routes/pageRoute");
const courseRouter = require("./routes/courseRoute");
const categoryRouter = require("./routes/categoryRoute");
const userRouter = require("./routes/userRoute");

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

// Global Variable
global.userIN = null;

// Middlewares
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "my_key_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbURI }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method',{
  methods: ['POST','GET']
}));

// Routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRouter);
app.use("/course", courseRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);

// Declare Port
const PORT = 11000;

app.listen(PORT, () => {
  console.log(`Server created in ${11000} port`);
});
