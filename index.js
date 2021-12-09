const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const homeRouter = require("./routes/homeRouter");
const loginRouter = require("./routes/loginRouter");
const moviesRouter = require("./routes/moviesRouter");
const registerRouter = require("./routes/registerRouter");
const bookingRouter = require("./routes/bookingRouter");

const app = express();
const port = 4000 || process.env.PORT;
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

// all routes
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/movies", moviesRouter);
app.use("/booking", bookingRouter);
app.use("/register", registerRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
