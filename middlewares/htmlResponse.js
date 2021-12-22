// response html and set some locals variable
function htmlResponse(title) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${title} - ${process.env.APPLICATION_Name} `;
    next()
  };
}

module.exports = {
  htmlResponse,
};
