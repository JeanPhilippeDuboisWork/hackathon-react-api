const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


module.exports = mongoose => {
  const schema = mongoose.Schema({
      nbTickets: String,
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      city: String,
      streetLine: String,
      secondStreetLine: String,
      postalCode: String,
      province: String,
      country: String,
      creditCardNumber: String,
    },
    {
      timestamps: true
    }
  );

  const User = mongoose.model("user", schema);
  return User;
};