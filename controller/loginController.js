const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const RegisterUser = require("../models/RegisterUser");
const shuffleArray = require("../lib/shuffleArray");
const Admin = require("../models/Movie");

function getLoginPage(req, res, next) {
  res.render("login");
}

const loginValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("username or email required."),
  check("password").isLength({ min: 1 }).withMessage("password is required."),
];

function loginValidatorResult(req, res, next) {
  const errors = validationResult(req).mapped();
  if (Object.keys(errors).length === 0) {
    next();
  } else {
    res.render("login", {
      errors,
    });
  }
}

async function loginToAccount(req, res) {
  try {
    const user = await RegisterUser.findOne({
      $or: [
        {
          username: req.body.username,
        },
        {
          email: req.body.username,
        },
      ],
    });
    // check username and password
    if (user && user._id) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const userInfo = {
          username: user.username,
          email: user.email,
          mobile: user.obile,
          gender: user.gender,
        };

        res.locals.loggedInUser = userInfo;
        // token generate
        const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRES_IN,
          signed: true,
          secure: true,
          httpOnly: true,
        });
        
        // find data for home page
        const data = await Admin.find();
        if (data) {
          res.render("index", {
            errors: {
              title: "Home page",
              common: { msg: "Password not match." },
            },
            data: shuffleArray(data),
          });
        } else {
          throw createError("Database occurs error");
        }
      } else {
        throw createError("Login Fail. Please try again.");
      }
    } else {
      throw createError("Login Fail. Please try again.");
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.render("login", {
      errors: {
        common: { msg: error.message },
      },
    });
  }
}

module.exports = {
  getLoginPage,
  loginToAccount,
  loginValidator,
  loginValidatorResult,
};