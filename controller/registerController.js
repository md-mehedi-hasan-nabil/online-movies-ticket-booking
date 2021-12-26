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
    .withMessage("Usrname must be at least 5 chars long")
    .trim(),
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email not valid")
    .trim()
    .custom(async (value) => {
      try {
        const user = await RegisterUser.findOne({ email: value });
        if (user) {
          throw createError("Email is already use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    })
    .withMessage("Email already use"),
  check("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password min length in 5"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw createError("Password confirmation is incorrect");
    }
    return true;
  }),
  check("mobile")
    .isMobilePhone("bn-BD")
    .withMessage("Use valid bd number")
    .custom(async (value) => {
      try {
        const user = await RegisterUser.findOne({ mobile: value });
        if (user) {
          throw createError("Phone number is already use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("birthday").isISO8601().toDate().withMessage("birthday is required"),
  check("gender").isLength({ min: 4 }).withMessage("Gender is required").trim(),
];

function sanitizationResult(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  res.render("register", { errors: errors.mapped() });
}

async function registerUser(req, res) {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return createError(500, "password not match");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new RegisterUser({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      mobile: req.body.mobile,
      birthday: req.body.birthday,
      gender: req.body.gender,
    });
    await newUser.save();
    
    res.render("login", { common: { msg: "SignUp successful" } });
  } catch (err) {
    console.log(err);
    res.redirect("/login");
    // res.render("register", {
    //   common: { msg: "Server side error!", err },
    //   title: "Login to Account",
    // });
  }
}

module.exports = {
  getRegisterPage,
  sanitization,
  sanitizationResult,
  registerUser,
};
