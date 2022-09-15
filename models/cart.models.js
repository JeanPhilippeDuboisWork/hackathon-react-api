const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = mongoose => {
  const schema = mongoose.Schema({
      userId: String,
      ticketId: Number,
      price: String
    },
    {
      timestamps: true
    }
  );
  
  const Cart = mongoose.model("cart", schema);
  return Cart;
};