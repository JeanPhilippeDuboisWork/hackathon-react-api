const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = mongoose => {
  const schema = mongoose.Schema({
      userId: String,
      nbTickets: Number,
      price: String
    },
    {
      timestamps: true
    }
  );
  
  const Ticket = mongoose.model("ticket", schema);
  return Ticket;
};