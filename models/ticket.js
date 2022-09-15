const { stringify } = require("querystring");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      idUTilisateur: String,
      nbTickets: Number,
      prix: String
    },
    { timestamps: true }
  );
  
  const Ticket = mongoose.model("ticket", schema);
  return Ticket;
};