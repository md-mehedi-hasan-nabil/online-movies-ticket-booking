const RegisterUser = require("../models/RegisterUser");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

function getRegisterPage(req, res, next) {
  res.render("register", {
    massage: "",
  });
}

const sanitization = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("Must be at least 5 chars long")
    .trim(),
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email not valid")
    .trim()
    .custom(async (value) => {
      try {
        const user = await RegisterUser.findOne({ email: value });
        console.log("find email::::",user)
        console.log(value)
      } catch(err) {
console.log(err)
      }
    }),
];

async function registerUser(req, res) {
  console.log(req.body)
  // try {
  //   if (req.body.password !== req.body.retypePasword) {
  //     throw createError(500, "password not match");
  //   }
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //   const newUser = new RegisterUser({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: hashedPassword,
  //     retypePasword: req.body.retypePasword,
  //     mobile: req.body.mobile,
  //     birthday: req.body.birthday,
  //     gender: req.body.gender,
  //   });
  //   await newUser.save();
  //   res.status(200).json({
  //     msg: "SignUp successful",
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({
  //     msg: "server side error!",
  //   });
  // }
}

module.exports = {
  getRegisterPage,
  sanitization,
  registerUser,
};
