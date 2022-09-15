const db = require("../models");
const User = db.users;
const Ticket = db.tickets;


exports.create = (req, res) => {
  if (!req.body.firstName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new User({
      nbTickets: req.body.nbTickets,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone : req.body.phone,
      city: req.body.city,
      streetLine: req.body.streetLine,
      secondStreetLine: req.body.secondStreetLine,
      postalCode: req.body.postalCode,
      province: req.body.province,
      country: req.body.country,
      creditCardNumber: req.body.creditCardNumber,
      published: req.body.published ? req.body.published : false
  });


  user
    .save(user)
    .then(data => {
      const ticket = new Ticket({
          userId: data.id,
          nbTickets: data.nbTickets,
          price: "50000"
      })
      ticket.save(ticket).then(data => {res.send(data);})

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  const condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  User.find(condition)
    .then(data => {

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Userwith id=" + id });
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
