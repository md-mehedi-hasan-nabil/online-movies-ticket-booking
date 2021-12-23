const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const homeRouter = require("./routes/homeRouter");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const bookingRouter = require("./routes/bookingRouter");
const adminRouter = require("./routes/adminRouter");
const { notFoundHandler, errorhandler } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 8080;

// use middleware
dotenv.config();
app.use(cors());

// parse json data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// template engines
app.set("view engine", "ejs");
// static folder
app.use(express.static(path.join(__dirname, "public")));

//mongoose database
//mehedi....49 Database
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kdlsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const local_uri = "mongodb://localhost/movies-ticket-booking";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful..."))
  .catch((err) => console.log(err));

// all routes
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/booking", bookingRouter);
app.use("/register", registerRouter);
app.use("/admin", adminRouter);
app.use("/dashboard", (req, res) => {
  res.render("dashboard", { title: "dashboard" });
});

// 404 not found handler
app.use(notFoundHandler);

// error handling
app.use(errorhandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
