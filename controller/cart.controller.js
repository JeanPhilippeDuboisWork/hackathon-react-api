const db = require("../models");
const Cart = db.carts;


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const userId = req.query.userId;
    const condition = userId ? { userId: { $regex: new RegExp(userId), $options: "i" } } : {};

    Cart.find(condition)
      .then(data => {

        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Cart."
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
            err.message || "Some error occurred while retrieving Cart."
        });
      });
  };
// Find a single Ticket with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Cart.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Cart with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Cart with id=" + id });
      });
};
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Cart with id=${id}. Maybe Cart was not found!`
          });
        } else res.send({ message: "Cart was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Cart updating User with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cart.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
          });
        } else {
          res.send({
            message: "Cart was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cart with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Cart.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Carts were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Carts."
        });
      });
  };