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

const app = express();
const port = process.env.PORT || 4000;

// use middleware
dotenv.config();
app.use(cors());

// parse json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// template engines
app.set("view engine", "ejs");
// static folder
app.use(express.static(path.join(__dirname, "public")));

//database
mongoose
  .connect("mongodb://localhost/movies-ticket-booking", {
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});