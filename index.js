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
//mehedi....20 Database
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rggmg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
app.use("/admin", adminRouter);

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(406).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
  //   console.log(err);

  //   next();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
