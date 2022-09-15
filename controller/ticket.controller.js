const db = require("../models");
const Ticket = db.tickets;


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const userId = req.query.userId;
    const condition = userId ? { userId: { $regex: new RegExp(userId), $options: "i" } } : {};

    Ticket.find(condition)
      .then(data => {

        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Ticket."
        });
      });
  };

  exports.findByUserID = (req, res) => {
    const userId = req.query.userId;

    Ticket.find(userId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Ticket."
        });
      });
  };
// Find a single Ticket with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Ticket.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Ticket with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Ticket with id=" + id });
      });
};
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Ticket.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Ticket with id=${id}. Maybe User was not found!`
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
  
    Ticket.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found!`
          });
        } else {
          res.send({
            message: "Ticket was deleted successfully!"
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
    Ticket.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tickets were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Tickets."
        });
      });
  };
