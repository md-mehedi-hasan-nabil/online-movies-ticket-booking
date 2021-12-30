
const Admin = require("../models/Movie");

function getBookingPage(req, res) {
  const id = req.params.id;
  Admin.findById(id, (error, data) => {
    if (error) {
      res.render("error", { title: "error", massage: error });
    }
    res.render("booking", { data: data });
  });
}

function ticketBooking(req, res) {
  console.log(req.body);

  res.send(req.body);
}

module.exports = {
  getBookingPage,
  ticketBooking,
};
