const dbConfig = require("../db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.users = require("./user.models")(mongoose);
db.tickets = require("./ticket.models")(mongoose);
db.cart = require("./cart.models")(mongoose);
module.exports = db;