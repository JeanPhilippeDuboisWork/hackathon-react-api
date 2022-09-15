const { cart } = require("../models");

module.exports = app => {
    const carts = require("../controller/cart.controller");
    let router = require("express").Router();
  
    // Find a ticket by user id
    router.post("/:id", carts.findByUserID)

    // Retrieve all carts 
    router.get("/", carts.findAll);

    // Retrieve a single carts 
    router.get("/:id", carts.findOne);
  
    // Update a ticket
    router.put("/:id", carts.update);
  
    // Delete a ticket with id
    router.delete("/:id", carts.delete);
  
    // Create a new ticket
    router.delete("/", carts.deleteAll);
  
    app.use('/api/ticket', router);
  };