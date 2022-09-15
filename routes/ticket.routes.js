module.exports = app => {
    const tickets = require("../controller/ticket.controller");
    let router = require("express").Router();
  
    // Find a ticket by user id
    router.post("/:id", tickets.findByUserID)

    // Retrieve all tickets
    router.get("/", tickets.findAll);

    // Retrieve a single ticket
    router.get("/:id", tickets.findOne);
  
    // Update a ticket
    router.put("/:id", tickets.update);
  
    // Delete a ticket with id
    router.delete("/:id", tickets.delete);
  
    // Create a new ticket
    router.delete("/", tickets.deleteAll);
  
    app.use('/api/ticket', router);
  };