const { stringify } = require("querystring");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nbTickets: String,
      firstName: String,
      lastName: String,
      email: String,
      telephone : String,
      city: String,
      addressFirst: String,
      addressSecond: String,
      postalCode: String,
      province: String,
      country: String,
      noCreditCard: String,
    },
    { timestamps: true }
  );

  const User = mongoose.model("user", schema);
  return User;
};