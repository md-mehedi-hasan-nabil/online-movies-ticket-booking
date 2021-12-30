const jwt = require("jsonwebtoken");

function checkLoggedInUser(req, res, next) {
  console.log()
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    token = cookies[process.env.COOKIE_NAME];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (res.locals.html) {
      res.locals.loggedInUser = decode;
    }
    next();
  } else {
    next();
  }
}

module.exports = checkLoggedInUser;
