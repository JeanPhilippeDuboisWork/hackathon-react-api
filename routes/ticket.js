module.exports = app => {
    const tickets = require("../controller/ticket.js");
  
    var router = require("express").Router();
  
    // FindByUserId
    router.post("/:id", tickets.findByUserID)
    // Retrieve all Tutorials
    router.get("/", tickets.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", tickets.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tickets.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tickets.delete);
  
    // Create a new Tutorial
    router.delete("/", tickets.deleteAll);
  
    app.use('/api/ticket', router);
  };